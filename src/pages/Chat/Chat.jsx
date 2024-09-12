import { useChatStore } from '@/stores/chatStore';
import ChatRoomList from './ChatRoomList';
import NotLogin from './NotLogin';

export default function Chat() {
  const { isLoggedIn } = useChatStore((s) => ({
    isLoggedIn: s.isLoggedIn,
  }));

  const component = isLoggedIn ? <ChatRoomList /> : <NotLogin />;

  return <>{component}</>;
}
