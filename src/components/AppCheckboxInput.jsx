import { memo, useId } from 'react';
import { string, bool, func } from 'prop-types';

AppCheckboxInput.propTypes = {
  label: string.isRequired,
  isHiddenLabel: bool,
  onChange: func,
  className: string,
  isChecked: bool,
  required: bool,
  checkedSvgId: string,
  unCheckedSvgId: string,
  checkedColor: string,
  unCheckedColor: string,
  isFilterClass: bool,
  filterName: string,
};

function AppCheckboxInput({
  label,
  isHiddenLabel = false,
  onChange,
  className,
  isChecked = false,
  required = false,
  checkedSvgId = '',
  unCheckedSvgId = '',
  checkedColor = 'text-mainColor',
  unCheckedColor = 'text-white',
  isFilterClass = false,
  filterName = '',
  ...restProps
}) {
  const id = useId();
  const svgColor = isChecked ? checkedColor : unCheckedColor;
  const svgIdToUse = isChecked
    ? checkedSvgId || unCheckedSvgId
    : unCheckedSvgId;

  const handleChange = (e) => {
    onChange?.(e.target);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      document.getElementById(id).click();
    }
  };

  const filterCheckedClass = isChecked ? 'border-mainColor' : ' ';
  const filterClass = isFilterClass
    ? 'p-3 border border-solid border-grayBorder rounded-[1.5625rem] text-f16 font-semibold'
    : ' ';

  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        name={id}
        className="opacity-0 absolute w-0 h-0"
        checked={isChecked}
        onChange={handleChange}
        required={required}
        data-filtername={filterName}
        {...restProps}
      />
      <label
        htmlFor={id}
        className={`flex items-center gap-1 text-f12 focus-visible:ring-1 focus-visible:ring-mainColor ${className || ''} ${filterCheckedClass} ${filterClass}`}
        tabIndex="0"
        onKeyPress={handleKeyPress}
      >
        {svgIdToUse && (
          <svg
            className={`w-5 h-5 ${svgColor}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <use href={`../assets/sprite.svg#${svgIdToUse}`} />
          </svg>
        )}
        <span className={isHiddenLabel ? 'sr-only' : ''}>{label}</span>
      </label>
    </div>
  );
}

export default memo(AppCheckboxInput);
