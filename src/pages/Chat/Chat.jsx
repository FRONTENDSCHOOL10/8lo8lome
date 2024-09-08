import { AppNav } from '@/components';
import AppMeta from '@/components/AppMeta';

export default function Chat() {
  return (
    <>
      <AppMeta title="채팅 목록 페이지" description="채팅 목록 페이지입니다." />
      <h2>채팅페이지</h2>
      <AppNav />
    </>
  );
}
