import { AppHeader } from '@/components';
import { AppNav } from '@/components';
import MyCoupon from './MyCoupon';
import MyProfile from './MyProfile';
import MyInfo from './MyInfo';
import AppMeta from '@/components/AppMeta';

export default function MyPage() {
  return (
    <>
      <AppMeta title="마이페이지" description="마이페이지 페이지입니다" />
      <AppHeader>마이 페이지</AppHeader>

      <MyProfile />
      <MyCoupon />
      <MyInfo />
      <AppNav />
    </>
  );
}
