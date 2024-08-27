import { createBrowserRouter } from 'react-router-dom';
import { configRoutes, getNavigationItems } from '@/utils';
import RootLayout from '@/layouts/RootLayout';

// import HomePage from '@/pages/Home';
// import {
//   Component as NoteDetail,
//   loader as noteDetailLoader,
// } from '@/pages/Notes/NoteDetail';

/**@type {import('react-router-dom').RouteObject[]} */
// const navigation = [
//   {
//     text: '홈',
//     path: '',
//     // display: false,
//     element: <HomePage />,
//   },
//   {
//     text: '칸반보드',
//     path: '/kanbanboard',
//     lazy: () => import('@/pages/KanbanBoard'),
//   },
//   {
//     text: '노트리스트',
//     path: '/notes',
//     lazy: () => import('@/pages/Notes/NoteList'),
//   },
//   {
//     text: '노트 디테일',
//     path: '/notes/:noteId',
//     display: false,
//     lazy: () => import('@/pages/Notes/NoteDetail'),
//   },
//   {
//     text: '노트 수정',
//     path: '/notes/:noteId/edit',
//     display: false,
//     lazy: () => import('@/pages/Notes/EditNote'),
//   },
//   {
//     text: '노트 추가',
//     path: '/notes/new',
//     lazy: () => import('@/pages/Notes/NewNote'),
//   },
// ];

/**@type {import('react-router-dom').RouteObject[]} */
export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: configRoutes(navigation),
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;

export const navigationItems = getNavigationItems(navigation);
