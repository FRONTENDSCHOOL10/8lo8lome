import { useChatStore } from '@/stores/chatStore';
import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from '@/components';
// import { mainStore } from '@/stores/mainStore';

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

  // const { fetchGymDetails } = mainStore((s) => ({
  //   fetchGymDetails: s.handleMethod.fetchGymDetails,
  // }));

  // fetchGymDetails(gymId);

  return (
    <>
      <AppHeader>헬스장</AppHeader>

      <section className="mx-8">
        <div className="w-s278 h-s156 bg-purple-300 mt-[100px] rounded">
          헬스장 사진 스와이퍼
        </div>

        <div>
          <div className="flex justify-between py-2">
            <h2 className="text-f20">신대방점</h2>
            <div className="flex items-center gap-1">
              <svg
                role="icon"
                aria-label="별점"
                className="w-3 h-3 fill-yellow-300"
              >
                <use href="/assets/sprite.svg#star" />
              </svg>
              <p className="text-f14">4.7</p>
            </div>
          </div>
          <ul className="text-f12 flex flex-col gap-1">
            <li>주소</li>
            <li>전화번호</li>
            <li>영업시간</li>
          </ul>
          <button className="text-f14 w-full text-right">리뷰보기</button>
        </div>
      </section>

      <section className="mx-8">
        <h3 className="text-f18 mb-2">가격</h3>
        <ul className="flex flex-col gap-4 bg-subBg rounded px-s14 py-s10">
          <li>
            <ul className="text-f18 flex flex-col gap-s10">
              헬스장
              <li className="text-f16 flex justify-between">
                <p>1일권</p>
                <p>15,000원</p>
              </li>
              <li className="text-f16 flex justify-between">
                <p>1개월</p>
                <p>60,000원</p>
              </li>
            </ul>
          </li>

          <li>
            <ul className="text-f18">PT</ul>
          </li>
        </ul>
      </section>

      <section className="mx-8">
        <h3 className="text-f18 mb-2">편의시설</h3>
        <ul className="flex">
          <li className="flex flex-col border border-solid border-white rounded p-2 gap-1">
            <svg
              role="icon"
              aria-label="와이파이"
              className="w-6 h-6 fill-white"
            >
              <use href="/assets/sprite.svg#wifi" />
            </svg>
            <span className="text-f12">WIFI</span>
          </li>
        </ul>
      </section>

      {/* <h1 className="text-[40px] mb-5 mt-[100px]">{gymId}</h1> */}
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
