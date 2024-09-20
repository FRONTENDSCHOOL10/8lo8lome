import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { useChatStore } from '@/stores/chatStore';
import { useNavigate, useParams } from 'react-router-dom';
import { AppCheckboxInput } from '@/components';
import { Link } from 'react-router-dom';

function GymDetailFooter() {
  const { gymId } = useParams();
  const navigate = useNavigate();

  const { gymData, wishListChecked, setWishList } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
    wishListChecked: s.searchInput.wishListChecked,
    setWishList: s.handleMethod.setWishList,
  }));
  const { createChatRoom } = useChatStore((s) => ({
    createChatRoom: s.createChatRoom,
  }));

  const handleCreateRoom = async () => {
    await createChatRoom(gymId, (roomId) => {
      navigate(`/chat/${roomId}`);
    });
  };

  return (
    <footer className="flex gap-s12 px-s31 pb-[1.5625rem] pt-12 justify-center items-center">
      <AppCheckboxInput
        label={`${gymData.name} 찜하기 체크박스`}
        isHiddenLabel
        name={gymData.name}
        isChecked={wishListChecked[gymData.name]}
        onChange={setWishList}
        unCheckedSvgId="heart-unclick"
        checkedSvgId="heart-click"
        checkedColor="text-red-500"
        svgSize="w-7 h-7"
      />
      <Link
        to={`/price/${gymId}`}
        aria-label="결제하기 링크"
        className="rounded p-s12 text-f18 font-normal text-black bg-mainColor w-full text-center"
      >
        결제하기
      </Link>
      <button
        onClick={handleCreateRoom}
        className="rounded p-s12 text-f18 font-normal text-white bg-subBg border border-solid border-grayBorder w-full"
      >
        헬스장 문의
      </button>
    </footer>
  );
}

export default memo(GymDetailFooter);
