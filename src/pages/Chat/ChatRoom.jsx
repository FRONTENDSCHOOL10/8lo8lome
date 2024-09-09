import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useChatStore } from '@/stores/chatStore';
import pb from '@/api/pb';
import { AppHeader } from '@/components';

function ChatRoom() {
  const { roomId } = useParams(); // URL에서 roomId를 가져옵니다.
  const { fetchMessages, currentRoomMessages, sendMessage } = useChatStore(
    (s) => ({
      fetchMessages: s.fetchMessages,
      currentRoomMessages: s.currentRoomMessages,
      sendMessage: s.sendMessage,
    })
  );

  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages(roomId);
  }, [roomId, fetchMessages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      return;
    }

    try {
      const userId = pb.authStore.model.id; // 로그인된 사용자의 ID
      await sendMessage(roomId, userId, newMessage);
      setNewMessage('');
      fetchMessages(roomId); // 새 메시지를 가져옵니다.
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="flex flex-col">
      <AppHeader>짐박스</AppHeader>
      <main className=" overflow-y-auto p-4 bg-mainBg min-h-[468px]">
        <div className="space-y-4">
          {currentRoomMessages[roomId] &&
            currentRoomMessages[roomId].map((msg) => (
              <div key={msg.id} className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-gray-900">{msg.content}</p>
              </div>
            ))}
        </div>
      </main>
      <footer className=" p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            className="flex-1 p-2 rounded border border-solid border-white text-white bg-transparent"
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            전송
          </button>
        </div>
      </footer>
    </div>
  );
}

export default ChatRoom;
