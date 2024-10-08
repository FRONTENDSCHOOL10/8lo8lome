import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { getNavigationItems } from '@/utils';
import RootLayout from '@/layouts/RootLayout';
import Home from '@/pages/Home';
// Login 컴포넌트
import Login from '@/pages/Login/Login';

import FindPassword from '@/pages/Login/FindPassword/FindPassword';
import FindId from '@/pages/Login/FindId/FindId';
// 회원가입 컴포넌트
import Signup from '@/pages/Signup/Signup';
// MyPage 하위 컴포넌트
import EditProfile from '@/pages/MyPage/EditProfile/EditProfile';
import PaymentHistory from '@/pages/MyPage/PaymentHistory/PaymentHistory';
import ReviewSettings from '@/pages/MyPage/ReviewSettings/ReviewSettings';
import WishList from '@/pages/MyPage/WishList/WishList';
import Setting from '@/pages/MyPage/Setting/Setting';
// Main페이지 하위 컴포넌트
import Filter from '@/pages/Main/Filter/Filter';
import AppStatusPage from '@/components/AppStatusPage';
import ChatRoom from '@/pages/Chat/ChatRoom';
import Review from '@/pages/Main/Review/Review';

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
        let { default: Main } = await import('@/pages/Main/Main');
        return { Component: Main };
      }}
    />
    <Route
      path="/map"
      lazy={async () => {
        let { default: Map } = await import('@/pages/Main/Map/Map');
        return { Component: Map };
      }}
    />
    <Route
      path="/main/:gymId"
      lazy={async () => {
        let { default: GymDetail } = await import(
          '@/pages/Main/GymDetail/GymDetail'
        );
        return { Component: GymDetail };
      }}
    />
    <Route path="/Review" element={<Review />} />
    <Route
      path="/TrainerDetail"
      lazy={async () => {
        let { default: TrainerDetail } = await import(
          '@/pages/Main/TrainerDetail/TrainerDetail'
        );
        return { Component: TrainerDetail };
      }}
    />
    <Route path="/filter" element={<Filter />} />
    <Route
      path="/price/:gymId"
      lazy={async () => {
        let { default: Price } = await import('@/pages/Main/Price/Price');
        return { Component: Price };
      }}
    />
    <Route
      path="/chat"
      lazy={async () => {
        let { default: Chat } = await import('./pages/Chat/Chat');
        return { Component: Chat };
      }}
    />
    <Route path="/chat/:roomId" element={<ChatRoom />} />
    <Route
      path="/mypage"
      lazy={async () => {
        let { default: MyPage } = await import('./pages/MyPage/MyPage');
        return { Component: MyPage };
      }}
    />
    <Route path="/mypage/editProfile" element={<EditProfile />} />
    <Route path="/mypage/paymentHistory" element={<PaymentHistory />} />
    <Route path="/mypage/reviewSettings" element={<ReviewSettings />} />
    <Route path="/mypage/wishList" element={<WishList />} />
    <Route path="/mypage/setting" element={<Setting />} />
    <Route path="/login" element={<Login />} />
    <Route path="/findId" element={<FindId />} />
    <Route path="/findPassword" element={<FindPassword />} />
    <Route
      path="/findPassword/success"
      element={<AppStatusPage status="password" />}
    />
    <Route path="/signup" element={<Signup />} />
    <Route path="*" element={<AppStatusPage status="404" />} />
  </Route>
);

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;

export const navigationItems = getNavigationItems(navigation);
