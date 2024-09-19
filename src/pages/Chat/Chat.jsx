import { useChatStore } from '@/stores/chatStore';
import ChatRoomList from './ChatRoomList';
import AppStatusPage from '@/components/AppStatusPage';

export default function Chat() {
  const { isLoggedIn } = useChatStore((s) => ({
    isLoggedIn: s.isLoggedIn,
  }));

  const component = isLoggedIn ? (
    <ChatRoomList />
  ) : (
    <AppStatusPage status="notLogin" />
  );

  return <>{component}</>;
}
