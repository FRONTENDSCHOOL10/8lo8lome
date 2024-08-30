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

  const buttonBaseClasses =
    'opacity-90 hover:opacity-100 flex gap-2 items-center justify-center rounded-full bg-accent text-white text-sm font-semibold px-6 py-2 border-0 disabled:bg-slate-500';
  const buttonClasses = `${buttonBaseClasses} ${buttonClassName}`.trim();

  const iconBaseClasses = 'inline-flex text-white text-base';
  const iconClasses = `${iconBaseClasses} ${iconClassName}`.trim();

  const wrapperClasses = `flex gap-1 w-full ${className}`.trim();

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
