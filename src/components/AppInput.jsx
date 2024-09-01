import { memo, useId, useState } from 'react';
import { bool, func, string } from 'prop-types';
import { throttle } from '@/utils';

AppInput.propTypes = {
  label: string.isRequired,
  email: bool,
  password: bool,
  passwordConfirm: bool,
  isHiddenLabel: bool,
  onChange: func,
  className: string,
  checkbox: bool,
};

function AppInput({
  label,
  email = false,
  password = false,
  checkbox = false,
  isHiddenLabel = false,
  onChange,
  className,
  ...restProps
}) {
  const id = useId();
  // ----------------------------------------------------------------

  const [type, setType] = useState(() => {
    let type = 'text';
    if (email) type = 'email';
    if (password) type = 'password';
    if (checkbox) type = 'checkbox';
    return type;
  });

  // ----------------------------------------------------------------

  const [inputValue, setInputValue] = useState('');

  const handleChange = throttle((e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange?.(value);
  }, 200);

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
    renderVisibleButton = (
      <button
        type="button"
        className="border border-1 border-green-500 p-2 absolute right-0"
        aria-label={visibleLabel}
        title={visibleLabel}
        onClick={handleToggle}
      >
        {isVisible ? '숨김' : '보기'}
      </button>
    );
  }

  let inputBaseClass =
    'bg-transparent border border-solid border-white rounded-md p-2 w-full';
  let labelBaseClass = '';
  if (className) {
    inputBaseClass = `${inputBaseClass} ${className}`;
  }
  if (type == 'checkbox') {
    inputBaseClass = 'w-5 h-5 rounded-lg';
    labelBaseClass = 'text-red-100';
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
        {...restProps}
      />
      <label
        htmlFor={id}
        className={isHiddenLabel ? 'sr-only' : labelBaseClass}
      >
        {label}
      </label>
      {renderVisibleButton}
    </div>
  );
}

export default memo(AppInput);
