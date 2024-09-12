import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '@/router';

function AppNav() {
  const [items] = useState(navigationItems);

  return (
    <footer className="fixed w-full bottom-0 w-[338px] bg-mainBg ">
      <nav>
        <h2 className="sr-only">페이지 탐색</h2>
        {items.length > 0 && (
          <ul className="py-s10 w-4/5 max-w-6xl mx-auto flex justify-around gap-8">
            {items.map((item, index) => (
              <li key={item.path ?? index}>
                <NavLink
                  to={item.path}
                  end={item.path?.endsWith('/') ?? false}
                  className={({ isActive }) => {
                    return isActive ? ' text-mainColor ' : 'text-white';
                  }}
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <svg
                      className={`w-6 h-6 `}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <use href={`../assets/sprite.svg#${item.svgId}`} />
                    </svg>
                    <p className="text-center text-f12">{item.text}</p>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </footer>
  );
}

export default memo(AppNav);
