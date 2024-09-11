import { useChatStore } from '@/stores/chatStore';
import { AppHeader } from '@/components';
import ChatMessages from './ChatMessages';
import ChatSubmitForm from './ChatSubmitForm';

function ChatRoom() {
  const { gymName } = useChatStore((s) => ({
    gymName: s.gymName,
  }));

  return (
    <>
      <AppHeader chat>{gymName}</AppHeader>
      <ChatMessages />
      <ChatSubmitForm />
    </>
  );
}

export default ChatRoom;
