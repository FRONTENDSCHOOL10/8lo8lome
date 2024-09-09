import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 라우터 훅 추가
import { AppHeader, AppNav } from '@/components';
import AppMeta from '@/components/AppMeta';
import { useChatStore } from '@/stores/chatStore';
import pb from '@/api/pb';

function LoggedIn() {
  const navigate = useNavigate(); // 라우터 훅 사용
  const { fetchChatRooms, chatRooms, noChatRoomsMessage, createChatRoom } =
    useChatStore((state) => ({
      fetchChatRooms: state.fetchChatRooms,
      chatRooms: state.chatRooms,
      noChatRoomsMessage: state.noChatRoomsMessage,
      createChatRoom: state.createChatRoom,
    }));

  const [error, setError] = useState('');

  useEffect(() => {
    fetchChatRooms();
  }, [fetchChatRooms]);

  const handleCreateRoom = async () => {
    try {
      const userId = pb.authStore.model.id; // 로그인된 사용자의 ID
      const gymId = 'ijt4sbokd8dlz19'; // 헬스장 ID

      await createChatRoom([userId, gymId], (roomId) => {
        navigate(`/chat/${roomId}`); // 새로 생성된 채팅방으로 이동
      });
    } catch (error) {
      console.error('Failed to create chat room:', error);
      setError('채팅방 생성에 실패했습니다.');
    }
  };

  const handleRoomClick = (roomId) => {
    navigate(`/chat/${roomId}`); // 채팅방 페이지로 이동
  };

  return (
    <>
      <AppMeta title="채팅 목록 페이지" description="채팅 목록 페이지입니다." />
      <AppHeader logo />
      <section className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">채팅 페이지</h2>

        {/* 채팅방 생성 폼 */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={handleCreateRoom}
            className="bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600 transition duration-300"
          >
            채팅방 생성
          </button>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>

        {/* 채팅방 목록 */}
        <div>
          {chatRooms.length > 0 ? (
            <ul className="space-y-4">
              {chatRooms.map((room) => (
                <li
                  key={room.id}
                  onClick={() => handleRoomClick(room.id)}
                  className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer transition duration-300"
                >
                  <h3 className="text-lg font-semibold">
                    {room.name || '채팅방 이름 없음'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    참여자 수: {room.participants.length}
                  </p>
                  {room.lastMessage && (
                    <p className="text-sm text-gray-700 mt-2 truncate">
                      {room.lastMessage}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">{noChatRoomsMessage}</p>
          )}
        </div>
      </section>
      <AppNav />
    </>
  );
}

export default LoggedIn;
