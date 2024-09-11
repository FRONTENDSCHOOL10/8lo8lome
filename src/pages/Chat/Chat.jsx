import { useChatStore } from '@/stores/chatStore';
import ChatRoomList from './ChatRoomList';
import Logout from './Logout';

export default function Chat() {
  const { isLoggedIn } = useChatStore((s) => ({
    isLoggedIn: s.isLoggedIn,
  }));

  const component = isLoggedIn ? <ChatRoomList /> : <Logout />;

  return <>{component}</>;
}
