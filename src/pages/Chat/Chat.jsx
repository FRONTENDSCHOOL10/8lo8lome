import { useChatStore } from '@/stores/chatStore';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

export default function Chat() {
  const { isLoggedIn } = useChatStore((s) => ({
    isLoggedIn: s.isLoggedIn,
  }));

  const component = isLoggedIn ? <LoggedIn /> : <LoggedOut />;

  return <>{component}</>;
}
