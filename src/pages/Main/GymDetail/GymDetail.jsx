import { useChatStore } from '@/stores/chatStore';
import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from '@/components';

function GymDetail() {
  const { gymId } = useParams();
  const navigate = useNavigate();
  const { createChatRoom, isLoading } = useChatStore((s) => ({
    createChatRoom: s.createChatRoom,
    isLoading: s.isLoading,
  }));
  const handleCreateRoom = async () => {
    await createChatRoom(gymId, (roomId) => {
      navigate(`/chat/${roomId}`);
    });
  };

  return (
    <>
      <AppHeader>헬스장 디테일</AppHeader>
      <h1 className="text-[40px] mb-5">{gymId}</h1>
      <button
        onClick={handleCreateRoom}
        disabled={isLoading} // 로딩 중에는 버튼 비활성화
        className="bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600 transition duration-300"
      >
        채팅방 생성
      </button>
    </>
  );
}
export default GymDetail;
