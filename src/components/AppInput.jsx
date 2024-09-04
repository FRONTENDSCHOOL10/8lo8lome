import { memo, useId, useState } from 'react';
import { bool, func, string } from 'prop-types';
import { throttle } from '@/utils';
import { useEffect } from 'react';

AppInput.propTypes = {
  label: string.isRequired,
  isHiddenLabel: bool,
  onChange: func,
  className: string,
  email: bool,
  password: bool,
  checkbox: bool,
  radio: bool,
  isChecked: bool,
  required: bool,
};

function AppInput({
  label,
  isHiddenLabel = false,
  onChange,
  className,
  email = false,
  password = false,
  checkbox = false,
  radio = false,
  isChecked = false,
  required = false,
  ...restProps
}) {
  const id = useId();
  // ----------------------------------------------------------------
  const [type, setType] = useState(() => {
    let type = 'text';
    if (email) type = 'email';
    if (password) type = 'password';
    if (checkbox) type = 'checkbox';
    if (radio) type = 'radio';

    return type;
  });

  // ----------------------------------------------------------------
  let INITIAL_CLASS =
    "inline-block bg-[url('../assets/unchecked.svg')] bg-no-repeat bg-cover w-[20px] h-[20px]";

  const [customCheckboxClass, setCustomCheckboxClass] = useState(
    checkbox ? INITIAL_CLASS : ''
  );
  const [checkedRadioClass, setCheckedRadioClass] = useState('');

  const [inputValue, setInputValue] = useState('');

  const handleChange = throttle((e) => {
    const value = checkbox || radio ? e.target : e.target.value;
    setInputValue(value);
    onChange?.(value);
  }, 200);

  useEffect(() => {
    if (checkbox) {
      setCustomCheckboxClass(
        isChecked
          ? "inline-block bg-[url('../assets/checked.svg')] bg-no-repeat bg-cover w-[20px] h-[20px]"
          : "inline-block bg-[url('../assets/unchecked.svg')] bg-no-repeat bg-cover w-[20px] h-[20px]"
      );
    }
  }, [isChecked, checkbox]);

  useEffect(() => {
    if (radio) {
      setCheckedRadioClass(
        isChecked
          ? 'border-transparent text-black bg-primary font-bold'
          : 'border border-solid border-white'
      );
    }
  }, [isChecked, radio]);

  // const isInputed = inputValue.trim().length > 0;

  // ----------------------------------------------------------------

  const [isVisible, setIsVisible] = useState(false);

  const visibleLabel = `패스워드 ${isVisible ? '감춤' : '표시'}`;

  const handleToggle = () => {
    if (isVisible) {
      setIsVisible(false);
      setType('password');
    } else {
      setIsVisible(true);
      setType('text');
    }
  };

  // ----------------------------------------------------------------

  let renderVisibleButton = null;

  if (type === 'password' || (type === 'text' && isVisible)) {
    const IsPasswordShow = isVisible ? (
      <svg className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
        <use href="../assets/sprite.svg#eye-off" />
      </svg>
    ) : (
      <svg className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
        <use href="../assets/sprite.svg#eye-on" />
      </svg>
    );

    renderVisibleButton = (
      <button
        type="button"
        className="p-2 absolute right-1 h-full"
        aria-label={visibleLabel}
        title={visibleLabel}
        onClick={handleToggle}
      >
        {IsPasswordShow}
      </button>
    );
  }

  let inputBaseClass =
    'bg-transparent border border-solid border-white rounded-md p-3 w-full';
  let labelBaseClass = 'flex items-center gap-1';

  if (className) {
    inputBaseClass = `${inputBaseClass} ${className}`;
  }
  if (type === 'checkbox') {
    inputBaseClass = 'hidden ';
    labelBaseClass = `${labelBaseClass} text-[12px]`;
  }
  if (type === 'radio') {
    inputBaseClass = 'hidden ';
    labelBaseClass = `${labelBaseClass} justify-center p-5 rounded-md text-[14px] ${checkedRadioClass}`;
  }
  const wrapperClass = 'relative w-full';
  // ----------------------------------------------------------------4

  return (
    <div className={wrapperClass}>
      <input
        type={type}
        id={id}
        name={id}
        defaultValue={inputValue}
        onChange={handleChange}
        className={inputBaseClass}
        checked={type === 'checkbox' ? isChecked : undefined}
        required={required}
        {...restProps}
      />
      <label
        htmlFor={id}
        className={isHiddenLabel ? 'sr-only' : labelBaseClass}
      >
        {type === 'checkbox' ? (
          <span className={customCheckboxClass}></span>
        ) : null}
        {label}
      </label>
      {renderVisibleButton}
    </div>
  );
}

export default memo(AppInput);
