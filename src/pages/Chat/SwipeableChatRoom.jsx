import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';
import { shape, func, string } from 'prop-types';
import { memo, useState } from 'react';
import { formatLastTime } from '@/utils';

SwipeableChatRoom.propTypes = {
  chatRoom: shape({
    id: string.isRequired,
    name: string.isRequired,
    lastMessage: string,
  }).isRequired,
  onDelete: func.isRequired,
};

function SwipeableChatRoom({ chatRoom, onDelete }) {
  const { id, name, lastMessage, lastTime } = chatRoom;
  const navigate = useNavigate();

  // 삭제 버튼의 가시성 상태를 관리
  const [isButtonVisible, setButtonVisible] = useState(false);

  // 스와이프 제스처 처리
  const onSwipedLeft = () => {
    setButtonVisible(true); // 삭제 버튼 보이기
  };

  const onSwipedRight = () => {
    if (isButtonVisible) {
      setButtonVisible(false); // 삭제 버튼 숨기기
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    delta: { x: 20, y: 20 },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // 마우스 스와이프 추적
  });

  const handleDelete = () => {
    try {
      if (onDelete) onDelete(id);
    } catch (error) {
      console.error('Failed to delete chat room:', error);
    }
  };

  const handleClick = () => {
    if (!isButtonVisible) {
      navigate(`/chat/${id}`);
    }
  };
  return (
    <div
      {...handlers}
      className="relative flex items-center border-b border-solid border-strokeBlack cursor-pointer text-white py-4"
    >
      <button
        id={`delete-btn-${id}`}
        className={`absolute right-0 bg-red-500 px-4 py-2 rounded transition-all duration-300 transform ${isButtonVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        onClick={handleDelete}
      >
        <svg
          className="w-5 h-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <use href={`../assets/sprite.svg#trash`} />
        </svg>
      </button>
      <div
        className="flex gap-3 w-full"
        onClick={handleClick} // 버튼이 보이지 않을 때만 채팅방으로 이동
      >
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
          <h3 className="text-f16 font-semibold">{name}</h3>
          {lastMessage && <p className="text-f12 mt-2">{lastMessage}</p>}
        </div>
        <p className="pt-[24px] text-gray-400 text-f12 flex-1 text-end">
          {formatLastTime(lastTime)}
        </p>
      </div>
    </div>
  );
}

export default memo(SwipeableChatRoom);
