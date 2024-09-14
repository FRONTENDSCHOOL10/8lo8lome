import { useState, useEffect } from 'react';
import { AppHeader, AppNav } from '@/components';
import AppMeta from '@/components/AppMeta';
import { useChatStore } from '@/stores/chatStore';
import SwipeableChatRoom from './SwipeableChatRoom'; // 수정된 컴포넌트
import AppLoading from '@/components/AppLoading';
import pb from '@/api/pb';

function ChatRoomList() {
  const [isLoading, setIsLoading] = useState(true);
  const { getChatRoomList, chatRooms, setGymOwner, deleteChatRoom } =
    useChatStore((s) => ({
      getChatRoomList: s.getChatRoomList,
      chatRooms: s.chatRooms,
      setGymOwner: s.setGymOwner,
      deleteChatRoom: s.deleteChatRoom,
    }));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await setGymOwner(); // 헬스장 owner일때 채팅방 리스트 가져오기
        await getChatRoomList(); // 채팅방 목록 가져오기
        setIsLoading(false); // 데이터 요청 완료
      } catch (error) {
        console.error('채팅방 데이터 가져오기 실패:', error);
      }
    };

    fetchData();

    // 채팅방 업데이트 구독 설정
    pb.collection('chatRooms').subscribe('*', async () => {
      await fetchData();
    });

    pb.collection('messages').subscribe('*', async () => {
      await fetchData(); // 메시지가 들어오면 채팅방 목록을 다시 가져옴
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      pb.collection('chatRooms').unsubscribe('*');
      pb.collection('messages').unsubscribe('*');
    };
  }, [setGymOwner, getChatRoomList]);

  const handleDeleteChatRoom = async (id) => {
    await deleteChatRoom(id); // 상태에서 채팅방 제거
    await getChatRoomList(); // 최신 채팅방 목록 가져오기
  };

  const chatRoomsList = chatRooms.length ? (
    <ul className="space-y-4">
      {chatRooms.map((room) => (
        <SwipeableChatRoom
          key={room.id}
          chatRoom={room}
          onDelete={handleDeleteChatRoom}
        />
      ))}
    </ul>
  ) : (
    <p className="text-gray-500">참여 중인 채팅방이 없습니다.</p>
  );

  return (
    <>
      <AppLoading isLoading={isLoading} />
      <AppMeta title="채팅 목록 페이지" description="채팅 목록 페이지입니다." />
      <AppHeader logo />
      <main className="p-6 max-w-4xl mx-auto mt-[81px]">
        <h2 className="sr-only">채팅 리스트</h2>
        <div className="mb-6 flex justify-between items-center"></div>
        <div>{chatRoomsList}</div>
      </main>
      <AppNav />
    </>
  );
}

export default ChatRoomList;
