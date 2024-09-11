import pb from '@/api/pb';
import { useChatStore } from '@/stores/chatStore';
import { useRef, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import { formatLastTime } from '@/utils';

function ChatMessages() {
  const { roomId } = useParams();
  const messagesEndRef = useRef(null);
  const { currentRoomMessages, userId, getChatMessages, updateChatRoom } =
    useChatStore((s) => ({
      currentRoomMessages: s.currentRoomMessages[roomId] || [], // 기본값 설정
      userId: s.userId,
      getChatMessages: s.getChatMessages,
      updateChatRoom: s.updateChatRoom,
    }));

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentRoomMessages]);

  useEffect(() => {
    // 데이터 가져오기 함수
    const fetchData = async () => {
      try {
        await getChatMessages(roomId);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    // 메시지와 채팅방 구독 설정
    pb.collection('messages').subscribe('*', async () => {
      await fetchData(); // 채팅방 목록 업데이트
    });
    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      pb.collection('messages').unsubscribe('*');
    };
  }, [roomId, getChatMessages, updateChatRoom]);

  return (
    <main className="overflow-y-auto p-4 bg-mainBg min-h-[468px] mt-[100px] mb-[60px]">
      <div>
        {currentRoomMessages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col gap-1 ${message.senderId === userId ? 'items-end' : 'items-start'} p-3`}
            ref={messagesEndRef}
          >
            <div
              className={`p-3 rounded-lg shadow-sm text-f14 font-semibold ${
                message.senderId === userId
                  ? 'bg-mainColor text-mainBg'
                  : 'bg-gray-100 text-black'
              }`}
            >
              <p>{message.content}</p>
            </div>
            <p className="text-gray-400 text-f12 px-1">
              {formatLastTime(message.timestamp)}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default memo(ChatMessages);
