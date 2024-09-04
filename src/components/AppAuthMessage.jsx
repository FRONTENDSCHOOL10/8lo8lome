import { string, bool } from 'prop-types';
import { useState } from 'react';

AppAuthMessage.propTypes = {
  children: string.isRequired,
  className: string,
  warning: bool,
};

export default function AppAuthMessage({ children, className, warning }) {
  let baseClass = warning ? 'text-xs text-warning' : 'text-xs text-primary';

  const [isShow] = useState(true);

  if (className) {
    baseClass = ` ${baseClass} ${className}`;
  }

  return isShow ? <span className={baseClass}>{children}</span> : '';
}
