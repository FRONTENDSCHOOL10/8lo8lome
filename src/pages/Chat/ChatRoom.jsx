import { useChatStore } from '@/stores/chatStore';
import { AppHeader } from '@/components';
import ChatMessages from './ChatMessages';
import ChatSubmitForm from './ChatSubmitForm';

function ChatRoom() {
  const { chatRooms } = useChatStore((s) => ({
    chatRooms: s.chatRooms,
  }));
  console.log(chatRooms);
  return (
    <>
      <AppHeader chat>{'상담 채팅'}</AppHeader>
      <ChatMessages />
      <ChatSubmitForm />
    </>
  );
}

export default ChatRoom;
