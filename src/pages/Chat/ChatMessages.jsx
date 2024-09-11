import pb from '@/api/pb';
import { useChatStore } from '@/stores/chatStore';
import { useRef, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';

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
    pb.collection('messages').subscribe('*', async (msg) => {
      await fetchData(); // 채팅방 목록 업데이트

      // 메시지가 새로 도착하면 lastMessage 업데이트
      if (msg && msg.collectionName === 'messages') {
        const roomId = msg.record.roomId; // 메시지에 포함된 roomId 가져오기
        const lastMessage = msg.record.content; // 메시지 내용 가져오기

        // 해당 채팅방의 lastMessage 업데이트
        await updateChatRoom(roomId, {
          lastMessage: lastMessage,
        });
      }
    });
    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      pb.collection('messages').unsubscribe();
    };
  }, [roomId, getChatMessages, updateChatRoom]);

  return (
    <main className="overflow-y-auto p-4 bg-mainBg min-h-[468px] mt-[100px] mb-[60px]">
      <div>
        {currentRoomMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === userId ? 'justify-end' : 'justify-start'} p-3`}
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
          </div>
        ))}
      </div>
    </main>
  );
}

export default memo(ChatMessages);
