import { memo, useId } from 'react';
import { string, bool, func } from 'prop-types';
import { throttle } from '@/utils';

AppTextInput.propTypes = {
  label: string.isRequired,
  isHiddenLabel: bool,
  onChange: func,
  className: string,
  value: string, //defaultValue에서 변경
  required: bool,
};

function AppTextInput({
  label,
  isHiddenLabel = false,
  onChange,
  className,
  value,
  required = false,
  ...restProps
}) {
  const id = useId();

  const handleChange = throttle((e) => {
    const newValue = e.target.value;
    onChange?.(newValue);
  }, 200);

  const inputBaseClass = `bg-transparent border border-solid border-white rounded p-s12 w-full focus:outline-none focus:border-mainColor ${className || ''}`;
  const wrapperClass = 'relative w-full';

  return (
    <div className={wrapperClass}>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
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
