import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '@/router';

function AppNav() {
  const [items] = useState(navigationItems);

  return (
    <nav className="bg-black">
      <h2 className="sr-only">페이지 탐색</h2>
      {items.length > 0 && (
        <ul className="py-4 w-4/5 max-w-6xl mx-auto flex justify-center gap-4">
          {items.map((item, index) => (
            <li key={item.path ?? index}>
              <NavLink
                to={item.path}
                end={item.path?.endsWith('/') ?? false}
                className={({ isActive }) => {
                  return isActive ? ' text-primary ' : 'text-white';
                }}
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default memo(AppNav);
