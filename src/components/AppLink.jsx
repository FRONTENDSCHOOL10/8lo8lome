import { memo } from 'react';
import { bool, node, string } from 'prop-types';

AppLink.propTypes = {
  href: string.isRequired,
  children: node.isRequired,
  isExternal: bool,
  className: string,
};

function AppLink({
  href,
  children,
  isExternal = false,
  className,
  ...restProps
}) {
  const externalProps = {};

  if (isExternal) {
    externalProps.target = '_blank';
    externalProps.rel = 'noreferrer noopener';
  }

  const combinedClassName = `text-indigo-500 hover:text-accent ${className || ''}`;

  return (
    <a
      href={href}
      className={combinedClassName}
      {...externalProps}
      {...restProps}
    >
      {children}
    </a>
  );
}

export default memo(AppLink);
