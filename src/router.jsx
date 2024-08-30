import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { getNavigationItems } from '@/utils';
import RootLayout from '@/layouts/RootLayout';
import { lazy } from 'react';

import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/Signup';

const Main = lazy(() => import('@/pages/Main/Main'));
const Chat = lazy(() => import('@/pages/Chat'));
const MyPage = lazy(() => import('@/pages/MyPage'));

/**@type {import('react-router-dom').RouteObject[]} */
const navigation = [
  {
    text: '메인',
    path: '/main',
  },
  {
    text: '채팅',
    path: '/chat',
  },
  {
    text: '마이페이지',
    path: '/mypage',
  },
];

/**@type {import('react-router-dom').RouteObject[]} */
export const routes = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Home />} />
    <Route path="/main" element={<Main />} />
    <Route path="/chat" element={<Chat />} />
    <Route path="/mypage" element={<MyPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Route>
);
const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;

export const navigationItems = getNavigationItems(navigation);
