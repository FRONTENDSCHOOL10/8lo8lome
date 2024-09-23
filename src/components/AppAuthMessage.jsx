import { string, bool } from 'prop-types';
import { memo } from 'react';

AppAuthMessage.propTypes = {
  children: string.isRequired,
  className: string,
  warning: bool,
};

function AppAuthMessage({ children, className, warning }) {
  let baseClass = warning ? 'text-warning' : 'text-mainColor';

  if (className) {
    baseClass = ` ${baseClass} ${className}`;
  }

  return <span className={`text-f12 py-2 ${baseClass}`}>{children}</span>;
}

export default memo(AppAuthMessage);
