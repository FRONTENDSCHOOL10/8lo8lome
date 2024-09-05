import { memo, useId } from 'react';
import { string, bool, func } from 'prop-types';

AppRadioInput.propTypes = {
  label: string.isRequired,
  isHiddenLabel: bool,
  onChange: func,
  className: string,
  isChecked: bool,
  required: bool,
  name: string,
  checkedColor: string,
  unCheckedColor: string,
};

function AppRadioInput({
  label,
  isHiddenLabel = false,
  onChange,
  className = '',
  isChecked = false,
  required = false,
  name = '',
  checkedColor = 'bg-mainColor text-black font-bold border-transparent',
  unCheckedColor = 'border border-solid border-white',
  ...restProps
}) {
  const id = useId();

  const handleChange = (e) => {
    onChange?.(e.target);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      document.getElementById(id).click();
    }
  };

  const radioClass = isChecked ? checkedColor : unCheckedColor;

  const labelBaseClass = `flex items-center gap-1 focus-within:border-mainColor justify-center p-s20 rounded text-f14 ${radioClass} ${className}`;

  return (
    <div className="relative w-full">
      <input
        type="radio"
        id={id}
        name={name}
        className="hidden"
        checked={isChecked}
        onChange={handleChange}
        required={required}
        {...restProps}
      />
      <label
        htmlFor={id}
        className={labelBaseClass}
        tabIndex="0"
        onKeyPress={handleKeyPress}
      >
        {!isHiddenLabel && label}
      </label>
    </div>
  );
}

export default memo(AppRadioInput);
