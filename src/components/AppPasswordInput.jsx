import { memo, useId, useState } from 'react';
import { string, bool, func } from 'prop-types';

AppPasswordInput.propTypes = {
  label: string.isRequired,
  isHiddenLabel: bool,
  onChange: func,
  className: string,
  required: bool,
};

function AppPasswordInput({
  label,
  isHiddenLabel = false,
  onChange,
  className,
  required = false,
  ...restProps
}) {
  const id = useId();
  const [type, setType] = useState('password');
  const [isVisible, setIsVisible] = useState(false);
  const visibleLabel = `패스워드 ${isVisible ? '감춤' : '표시'}`;

  const handleChange = (e) => {
    onChange?.(e.target.value);
  };

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
    setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        name={id}
        onChange={handleChange}
        className={`bg-transparent border border-solid border-white rounded-md p-3 w-full ${className || ''}`}
        required={required}
        {...restProps}
      />
      <label htmlFor={id} className={isHiddenLabel ? 'sr-only' : ''}>
        {label}
      </label>
      <button
        type="button"
        className="p-2 absolute right-1 h-full"
        aria-label={visibleLabel}
        title={visibleLabel}
        onClick={handleToggle}
      >
        <svg className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
          <use
            href={`../assets/sprite.svg#${isVisible ? 'eye-off' : 'eye-on'}`}
          />
        </svg>
      </button>
    </div>
  );
}

export default memo(AppPasswordInput);
