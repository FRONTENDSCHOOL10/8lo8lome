import { memo, useId, useState } from 'react';
import { string, bool, func } from 'prop-types';
import { throttle } from '@/utils';

AppTextInput.propTypes = {
  label: string.isRequired,
  isHiddenLabel: bool,
  onChange: func,
  className: string,
  required: bool,
};

function AppTextInput({
  label,
  isHiddenLabel = false,
  onChange,
  className,
  required = false,
  ...restProps
}) {
  const id = useId();
  const [inputValue, setInputValue] = useState('');

  const handleChange = throttle((e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange?.(value);
  }, 200);

  const inputBaseClass = `bg-transparent border border-solid border-white rounded p-s12 w-full ${className || ''}`;
  const wrapperClass = 'relative w-full';

  return (
    <div className={wrapperClass}>
      <input
        type="text"
        id={id}
        name={id}
        defaultValue={inputValue}
        onChange={handleChange}
        className={inputBaseClass}
        required={required}
        {...restProps}
      />
      <label htmlFor={id} className={isHiddenLabel ? 'sr-only' : ''}>
        {label}
      </label>
    </div>
  );
}

export default memo(AppTextInput);
