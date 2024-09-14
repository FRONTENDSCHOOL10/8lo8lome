import { useChatStore } from '@/stores/chatStore';
import { AppHeader } from '@/components';
import ChatMessages from './ChatMessages';
import ChatSubmitForm from './ChatSubmitForm';
import { useLocation } from 'react-router-dom';

function ChatRoom() {
  const { state } = useLocation();
  const { gymName } = useChatStore((s) => ({
    gymName: s.gymName,
  }));
  const gymNameValue = state?.gymName || gymName;
  return (
    <>
      <AppHeader chat>{gymNameValue}</AppHeader>
      <ChatMessages />
      <ChatSubmitForm />
    </>
  );
}

export default ChatRoom;
