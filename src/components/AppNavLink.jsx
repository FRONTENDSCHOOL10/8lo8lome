import { string } from 'prop-types';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

AppNavLink.propTypes = {
  className: string,
};

function AppNavLink({ className, ...restProps }) {
  const baseNavClasses = `text-f14 py-s8 px-s16 text-indigo-800/70 rounded-full hover:text-indigo-800 ${className || ''}`;

  return (
    <NavLink
      className={({ isActive }) => {
        return isActive
          ? `${baseNavClasses} text-indigo-900 bg-indigo-100/40 border border-indigo-100/70 font-semibold`
          : baseNavClasses;
      }}
      {...restProps}
    />
  );
}

export default memo(AppNavLink);
