import pb from '@/api/pb';
import { useChatStore } from '@/stores/chatStore';
import { useRef, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';

function ChatMessages() {
  const { roomId } = useParams();
  const messagesEndRef = useRef(null);
  const { currentRoomMessages, userId, getChatMessages } = useChatStore(
    (s) => ({
      currentRoomMessages: s.currentRoomMessages[roomId] || [], // 기본값 설정
      userId: s.userId,
      getChatMessages: s.getChatMessages,
      updateChatRoom: s.updateChatRoom,
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getChatMessages(roomId);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // 메시지 구독 설정
    pb.collection('messages').subscribe('*', async () => {
      await fetchData(); // 메시지가 업데이트되면 데이터 다시 가져오기
    });

    // 스크롤을 메시지 목록 끝으로 이동
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      pb.collection('messages').unsubscribe('*'); // 메시지 구독 해제
    };
  }, [roomId, getChatMessages, currentRoomMessages]);

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
