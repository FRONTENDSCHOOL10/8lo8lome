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
    let isFetching = false; // 데이터를 요청 중인지 확인하는 플래그 변수

    const fetchData = async () => {
      if (isFetching) return; // 이미 요청 중이면 종료
      isFetching = true; // 요청 시작
      setIsLoading(true);

      try {
        await setGymOwner(); // 헬스장 owner일때 채팅방 리스트 가져오기
        await getChatRoomList(); // 채팅방 목록 가져오기
      } catch (error) {
        console.error('채팅방 데이터 가져오기 실패:', error);
      } finally {
        isFetching = false; // 요청이 끝났음을 알림
        setIsLoading(false); // 데이터 요청 완료
      }
    };

    fetchData(); // 초기 데이터 요청

    // 채팅방 업데이트 구독 설정
    pb.collection('chatRooms').subscribe('*', fetchData);
    pb.collection('messages').subscribe('*', fetchData);

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      isFetching = false; // 요청 중단
      pb.collection('chatRooms').unsubscribe('*'); // 채팅방 구독 해제
      pb.collection('messages').unsubscribe('*'); // 메시지 구독 해제
    };
  }, [setGymOwner, getChatRoomList]);

  const handleDeleteChatRoom = async (id) => {
    await deleteChatRoom(id);
    await getChatRoomList();
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
