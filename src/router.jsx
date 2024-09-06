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

import EditProfile from '@/pages/MyPage/EditProfile/EditProfile';
import Map from '@/pages/Main/Map/Map';
import Gym from '@/pages/Main/Gym/Gym';
import Filter from '@/pages/Main/Filter/Filter';
import AppSuccess from '@/components/AppSuccess';

/**@type {import('react-router-dom').RouteObject[]} */
const navigation = [
  {
    text: '홈',
    path: '/main',
    svgId: 'home',
  },
  {
    text: '상담',
    path: '/chat',
    svgId: 'chat',
  },
  {
    text: 'MY',
    path: '/mypage',
    svgId: 'my',
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
    <Route path="/filter" element={<Filter />} />
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
    <Route path="/mypage/editProfile" element={<EditProfile />} />
    <Route path="/login" element={<Login />} />
    <Route path="/findId" element={<FindId />} />
    <Route path="/findPassword" element={<FindPassword />} />
    <Route
      path="/findPassword/success"
      element={<AppSuccess status="password" />}
    />
    <Route path="/signup" element={<Signup />} />
  </Route>
);

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;

export const navigationItems = getNavigationItems(navigation);
