import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { getNavigationItems } from '@/utils';
import RootLayout from '@/layouts/RootLayout';

import Home from '@/pages/Home';
import Login from '@/pages/Login/Login';
import Signup from '@/pages/Signup/Signup';
import FindPassword from '@/pages/Login/FindPassword/FindPassword';
import FindId from '@/pages/Login/FindId/FindId';
import Map from './pages/Main/Map/Map';
import Gym from './pages/Main/Gym/Gym';

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
    <Route
      path="/main"
      lazy={async () => {
        let { default: Main } = await import('./pages/Main/Main');
        return { Component: Main };
      }}
    />
    <Route path="/map" element={<Map />} />
    <Route path="/gym" element={<Gym />} />
    <Route
      path="/chat"
      lazy={async () => {
        let { default: Chat } = await import('./pages/Chat/Chat');
        return { Component: Chat };
      }}
    />
    <Route
      path="/mypage"
      lazy={async () => {
        let { default: MyPage } = await import('./pages/MyPage/MyPage');
        return { Component: MyPage };
      }}
    />
    <Route path="/login" element={<Login />} />
    <Route path="/findId" element={<FindId />} />
    <Route path="/findPassword" element={<FindPassword />} />
    <Route path="/signup" element={<Signup />} />
  </Route>
);

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;

export const navigationItems = getNavigationItems(navigation);
