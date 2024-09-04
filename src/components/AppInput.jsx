import { memo, useId, useState } from 'react';
import { bool, func, string } from 'prop-types';
import { throttle } from '@/utils';

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
  svgCheckedColor: string,
  checkedSvgId: string,
  unCheckedSvgId: string,
  checkedColor: string,
  unCheckedColor: string,
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
  checkedSvgId = '',
  unCheckedSvgId = '',
  checkedColor = 'text-primary',
  unCheckedColor = 'text-white',
  ...restProps
}) {
  const id = useId();
  // ----------------------------------------------------------------
  // 타입 지정
  const [type, setType] = useState(() => {
    let type = 'text';
    if (email) type = 'email';
    if (password) type = 'password';
    if (checkbox) type = 'checkbox';
    if (radio) type = 'radio';

    return type;
  });

  // ----------------------------------------------------------------

  // SVG 색상 설정
  const svgColor = checkbox ? (isChecked ? checkedColor : unCheckedColor) : '';
  // SVG ID 선택
  const svgIdToUse = checkbox && unCheckedSvgId ? unCheckedSvgId : checkedSvgId;
  // SVG 렌더링
  const svg = svgIdToUse ? (
    <svg
      className={`w-5 h-5 ${svgColor}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <use href={`../assets/sprite.svg#${svgIdToUse}`} />
    </svg>
  ) : null;

  const checkedRadioClass = radio
    ? isChecked
      ? 'border-transparent text-black bg-primary font-bold'
      : 'border border-solid border-white'
    : '';

  const [inputValue, setInputValue] = useState('');

  const handleChange = throttle((e) => {
    const value = checkbox || radio ? e.target : e.target.value;
    setInputValue(value);
    onChange?.(value);
  }, 200);

  // ----------------------------------------------------------------
  // 비밀번호 보기 버튼 표시
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

  let renderVisibleButton = null;

  if (type === 'password' || (type === 'text' && isVisible)) {
    const passwordSvgId = isVisible ? 'eye-off' : 'eye-on';
    renderVisibleButton = (
      <button
        type="button"
        className="p-2 absolute right-1 h-full"
        aria-label={visibleLabel}
        title={visibleLabel}
        onClick={handleToggle}
      >
        <svg className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
          <use href={`../assets/sprite.svg#${passwordSvgId}`} />
        </svg>
      </button>
    );
  }
  // ----------------------------------------------------------------

  let inputBaseClass =
    'bg-transparent border border-solid border-white rounded-md p-3 w-full';
  let labelBaseClass = 'flex items-center gap-1 focus-within:border-primary';

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

  // ----------------------------------------------------------------

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      document.getElementById(id).click();
    }
  };

  // ----------------------------------------------------------------

  // 실제 return되는 jsx
  return (
    <div className={wrapperClass}>
      <input
        type={type}
        id={id}
        name={id}
        defaultValue={inputValue}
        onChange={handleChange}
        className={inputBaseClass}
        checked={isChecked}
        required={required}
        {...restProps}
      />
      <label
        htmlFor={id}
        className={isHiddenLabel ? 'sr-only' : labelBaseClass}
        tabIndex="0"
        onKeyPress={handleKeyPress}
      >
        {svg}
        <span className={isHiddenLabel ? 'sr-only' : ''}>{label}</span>
      </label>
      {renderVisibleButton}
    </div>
  );
}

export default memo(AppInput);
