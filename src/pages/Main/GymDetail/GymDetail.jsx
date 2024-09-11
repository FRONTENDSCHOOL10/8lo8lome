import { useChatStore } from '@/stores/chatStore';
import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from '@/components';

function GymDetail() {
  const { gymId } = useParams();
  const navigate = useNavigate();
  const { createChatRoom } = useChatStore((s) => ({
    createChatRoom: s.createChatRoom,
  }));
  const handleCreateRoom = async () => {
    await createChatRoom(gymId, (roomId) => {
      navigate(`/chat/${roomId}`);
    });
  };

  return (
    <>
      <AppHeader>헬스장 디테일</AppHeader>
      <h1 className="text-[40px] mb-5 mt-[100px]">{gymId}</h1>
      <button
        onClick={handleCreateRoom}
        className="bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600 transition duration-300"
      >
        채팅방 생성
      </button>
    </>
  );
}
export default GymDetail;
