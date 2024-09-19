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
// import LogOut from '@/pages/MyPage/LogOut/LogOut';
// Main페이지 하위 컴포넌트
import Map from '@/pages/Main/Map/Map';
import Filter from '@/pages/Main/Filter/Filter';
import AppStatusPage from '@/components/AppStatusPage';
import ChatRoom from '@/pages/Chat/ChatRoom';
import GymDetail from '@/pages/Main/GymDetail/GymDetail';
import Review from '@/pages/Main/Review/Review';
import TrainerDetail from '@/pages/Main/TrainerDetail/TrainerDetail';
import Payment from '@/pages/Main/Payment/Payment';

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
    <Route path="/main/:gymId" element={<GymDetail />} />
    <Route path="/Review" element={<Review />} />
    <Route path="/TrainerDetail" element={<TrainerDetail />} />
    <Route path="/Payment" element={<Payment />} />
    <Route path="/filter" element={<Filter />} />
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
    {/* <Route path="/mypage/logOut" element={<LogOut />} /> */}
    {/*account*/}
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
