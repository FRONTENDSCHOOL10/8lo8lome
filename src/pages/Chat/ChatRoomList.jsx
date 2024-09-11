import { useEffect } from 'react';
import { AppHeader, AppNav } from '@/components';
import AppMeta from '@/components/AppMeta';
import { useChatStore } from '@/stores/chatStore';
import { Link } from 'react-router-dom';
import pb from '@/api/pb';

function ChatRoomList() {
  const { getChatRoomList, chatRooms, setGymOwner } = useChatStore((s) => ({
    getChatRoomList: s.getChatRoomList,
    chatRooms: s.chatRooms,
    setGymOwner: s.setGymOwner,
  }));

  // 비동기 데이터 로딩 및 구독 함수
  useEffect(() => {
    const fetchData = async () => {
      await setGymOwner(); // 헬스장 owner일때 채팅방 리스트 가져오기
      await getChatRoomList(); // 채팅방 목록 가져오기
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

  return (
    <>
      <AppMeta title="채팅 목록 페이지" description="채팅 목록 페이지입니다." />
      <AppHeader logo />
      <main className="p-6 max-w-4xl mx-auto mt-[81px]">
        <h2 className="sr-only">채팅 리스트</h2>
        <div className="mb-6 flex justify-between items-center"></div>
        <div>
          {chatRooms.length ? (
            <ul className="space-y-4 ">
              {chatRooms.map((room) => {
                return (
                  <li
                    key={room.id}
                    className=" border-b border-solid border-strokeBlack cursor-pointer text-white flex justify-between gap-[10px] py-4"
                  >
                    <Link to={`/chat/${room.id}`} className="flex gap-3">
                      <svg
                        className="border-2 border-solid border-white rounded-full text-mainColor p-[6px]"
                        width={40}
                        height={40}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                      >
                        <use href={`../assets/sprite.svg#barbell`} />
                      </svg>
                      <div className="flex flex-col">
                        <h3 className="text-f16 font-semibold">{room.name}</h3>
                        {room.lastMessage && (
                          <p className="text-f12 mt-2 ">{room.lastMessage}</p>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500">참여 중인 채팅방이 없습니다.</p>
          )}
        </div>
      </main>
      <AppNav />
    </>
  );
}

export default ChatRoomList;
