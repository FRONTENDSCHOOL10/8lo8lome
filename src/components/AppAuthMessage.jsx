import { string, bool } from 'prop-types';
import { useState } from 'react';

AppAuthMessage.propTypes = {
  children: string.isRequired,
  className: string,
  warning: bool,
};

export default function AppAuthMessage({ children, className, warning }) {
  let baseClass = warning ? 'text-f12 text-warning' : 'text-f12 text-mainColor';

  const [isShow] = useState(true);

  if (className) {
    baseClass = ` ${baseClass} ${className}`;
  }

  return isShow ? <span className={baseClass}>{children}</span> : '';
}
