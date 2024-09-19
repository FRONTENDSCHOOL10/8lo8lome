import { useSwipeable } from 'react-swipeable';
import { shape, func, string } from 'prop-types';
import { memo, useState } from 'react';
import { formatLastTime } from '@/utils';
import { Link } from 'react-router-dom';

SwipeableChatRoom.propTypes = {
  chatRoom: shape({
    id: string.isRequired,
    name: string.isRequired,
    lastMessage: string,
    lastTime: string,
  }).isRequired,
  onDelete: func.isRequired,
};

function SwipeableChatRoom({ chatRoom, onDelete }) {
  const { id, name, lastMessage, lastTime } = chatRoom;

  const [isButtonVisible, setButtonVisible] = useState(false);

  const onSwipedLeft = () => {
    setButtonVisible(true);
  };

  const onSwipedRight = () => {
    setButtonVisible(false);
  };

  const handlers = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    delta: { x: 30, y: 30 }, // 스와이프 감도 조정
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleDelete = () => {
    onDelete?.(id);
  };

  return (
    <li
      {...handlers}
      className="relative flex items-center border-b border-solid border-strokeBlack cursor-pointer text-white py-4"
    >
      <button
        id={`delete-btn-${id}`}
        className={`absolute z-10 right-0 bg-red-500 px-5 py-2 rounded transition-all duration-300 transform ${isButtonVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
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
      <Link
        to={`/chat/${id}`}
        state={{ gymName: name }}
        className="flex gap-3 w-full"
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
        <div className="flex flex-col flex-1">
          <h3 className="text-f16 font-semibold">{name}</h3>
          {lastMessage && <p className="text-f12 mt-2">{lastMessage}</p>}
        </div>
        {lastTime && (
          <p className="pt-[24px] text-gray-400 text-f12 flex-1 text-end">
            {formatLastTime(lastTime)}
          </p>
        )}
      </Link>
    </li>
  );
}

export default memo(SwipeableChatRoom);
