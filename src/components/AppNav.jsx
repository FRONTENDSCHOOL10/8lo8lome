// import clsx from 'clsx';
// import { memo, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { navigationItems } from '@/router';

// function AppNav() {
//   const [items] = useState(navigationItems);

//   const baseNavClasses =
//     'text-sm py-2 px-4 text-indigo-800/70 rounded-full hover:text-indigo-800';

//   return (
//     <nav className="bg-white">
//       <h2 className="sr-only">페이지 탐색</h2>
//       {items.length > 0 && (
//         <ul className="py-4 w-4/5 max-w-6xl mx-auto flex justify-center gap-4">
//           {items.map((item, index) => (
//             <li key={item.path ?? index}>
//               <NavLink
//                 to={item.path}
//                 end={item.path?.endsWith('/') ?? false}
//                 className={({ isActive }) => {
//                   return isActive
//                     ? clsx(
//                         baseNavClasses,
//                         'text-indigo-900 bg-indigo-100/40 border border-indigo-100/70 font-semibold'
//                       )
//                     : baseNavClasses;
//                 }}
//               >
//                 {item.text}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       )}
//     </nav>
//   );
// }

// export default memo(AppNav);
