import { memo } from 'react';
import { bool, element, node, object, string } from 'prop-types';

AppButton.propTypes = {
  submit: bool,
  reset: bool,
  disabled: bool,
  icon: element,
  className: string,
  children: node.isRequired,
  buttonProps: object,
  iconProps: object,
  isFilled: bool,
};

function AppButton({
  submit = false,
  reset = false,
  disabled = false,
  icon = null,
  className = '',
  children,
  buttonProps = null,
  iconProps = null,
  isFilled = true,
  ...restProps
}) {
  let type = 'button';
  if (submit) type = 'submit';
  if (reset) type = 'reset';

  let buttonRestProps = {};
  let buttonClassName = '';
  if (buttonProps) {
    const { className: buttonClass, ...rest } = buttonProps;
    buttonClassName = buttonClass || '';
    buttonRestProps = rest;
  }

  let iconRestProps = {};
  let iconClassName = '';
  if (iconProps) {
    const { className: iconClass, ...rest } = iconProps;
    iconClassName = iconClass || '';
    iconRestProps = rest;
  }

  const buttonBaseClass =
    'opacity-100 flex items-center justify-center rounded-md text-sm py-3 border disabled:opacity-50 w-full';
  const filledClass = 'bg-primary text-black font-semibold border-none';
  const outlinedClass = 'border-solid border-white bg-transparent text-white';

  const buttonClasses =
    `${buttonBaseClass} ${isFilled ? filledClass : outlinedClass} ${buttonClassName} ${className}`.trim();
  const iconBaseClasses = 'inline-flex text-base';
  const iconClasses = `${iconBaseClasses} ${iconClassName}`.trim();
  const wrapperClasses = 'flex gap-1 w-full';

  return (
    <div className={wrapperClasses} {...restProps}>
      <button
        type={type}
        className={buttonClasses}
        disabled={disabled}
        {...buttonRestProps}
      >
        {icon && (
          <span className={iconClasses} {...iconRestProps}>
            {icon}
          </span>
        )}
        {children}
      </button>
    </div>
  );
}

export default memo(AppButton);
