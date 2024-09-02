import { string } from 'prop-types';
import { useState } from 'react';

AppAuthMessage.propTypes = {
  children: string.isRequired,
  className: string,
};

export default function AppAuthMessage({ children, className }) {
  const [isShow] = useState(true);

  let baseClass = 'text-warning text-xs';

  if (className) {
    baseClass = `${baseClass} ${className}`;
  }

  return isShow ? <span className={baseClass}>{children}</span> : '';
}
