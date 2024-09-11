import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { AppHeader, AppTextInput } from '@/components';
import pb from '@/api/pb';
import ChatMessages from './ChatMessages';

function ChatRoom() {
  const { roomId } = useParams();
  const {
    getMessages,
    sendMessage,
    getNewMessage,
    newMessage,
    gymName,
    getChatList,
  } = useChatStore((s) => ({
    getMessages: s.getMessages,
    sendMessage: s.sendMessage,
    getNewMessage: s.getNewMessage,
    newMessage: s.newMessage,
    gymName: s.gymName,
    getChatList: s.getChatList,
  }));

  useEffect(() => {
    // 데이터 가져오기 함수
    const fetchData = async () => {
      try {
        await getMessages(roomId);

        await getChatList();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // 메시지와 채팅방 구독 설정
    pb.collection('messages').subscribe('*', async () => {
      await fetchData();
    });
    pb.collection('chatRooms').subscribe('*', async () => {
      await fetchData();
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      pb.collection('messages').unsubscribe();
      pb.collection('chatRooms').unsubscribe();
    };
  }, [roomId, getMessages, getChatList]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(roomId);
    }
  };

  return (
    <>
      <AppHeader chat>{gymName}</AppHeader>
      <ChatMessages roomId={roomId} />
      <form
        className="flex items-center px-4 py-[14px] gap-2 w-[339px] fixed bottom-[129px] bg-subBg border-t border-b border-solid border-white"
        onSubmit={(e) => {
          e.preventDefault(); // 페이지 새로고침 방지
          handleSendMessage(); // 메시지 전송 함수 호출
        }}
      >
        <AppTextInput
          label="메시지"
          isHiddenLabel
          className="rounded-full border border-solid border-white text-white bg-transparent py-s6 text-f14"
          onChange={getNewMessage}
          placeholder="메시지를 입력하세요"
        />
        <button type="submit">
          <svg
            className={`w-5 h-5 text-mainColor`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <use href={`../assets/sprite.svg#send`} />
          </svg>
        </button>
      </form>
    </>
  );
}

export default ChatRoom;
