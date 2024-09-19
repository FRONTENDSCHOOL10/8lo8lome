import { string, bool } from 'prop-types';

AppAuthMessage.propTypes = {
  children: string.isRequired,
  className: string,
  warning: bool,
};

export default function AppAuthMessage({ children, className, warning }) {
  let baseClass = warning ? 'text-warning' : 'text-mainColor';

  if (className) {
    baseClass = ` ${baseClass} ${className}`;
  }

  return <span className={`text-f12 py-2 ${baseClass}`}>{children}</span>;
}
