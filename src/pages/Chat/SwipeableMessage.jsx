import { formatLastTime } from '@/utils';
import { useState, memo } from 'react';
import { useSwipeable } from 'react-swipeable';
import { string, shape } from 'prop-types';
import { useChatStore } from '@/stores/chatStore';
import { useParams } from 'react-router-dom';

SwipeableMessage.propTypes = {
  message: shape({
    id: string.isRequired,
    content: string.isRequired,
    senderId: string.isRequired,
    timestamp: string.isRequired,
  }).isRequired,
  userId: string.isRequired,
};

function SwipeableMessage({ message, userId }) {
  const { roomId } = useParams();

  const [showDelete, setShowDelete] = useState(false);
  const { deleteMessage } = useChatStore((s) => ({
    deleteMessage: s.deleteMessage,
  }));
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (message.senderId === userId) {
        setShowDelete(true);
      }
    },
    onSwipedRight: () => {
      if (message.senderId === userId) {
        setShowDelete(false);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleDelete = () => {
    if (message.senderId === userId) {
      deleteMessage(message.id, roomId);
    }
  };

  return (
    <div
      className={`flex items-center ${message.senderId === userId ? 'justify-end' : 'justify-start'} py-1 overflow-hidden relative`}
    >
      <div
        className={`flex flex-col gap-1 text-f14 font-semibold text-black `}
        {...handlers}
      >
        <p
          className={`p-3 rounded cursor-pointer  ${
            message.senderId === userId ? 'bg-mainColor' : 'bg-gray-100'
          }`}
        >
          {message.content}
        </p>
        <p className="text-gray-400 text-f12 text-end">
          {formatLastTime(message.timestamp)}
        </p>
      </div>
      {message.senderId === userId && (
        <button
          className={`ml-4 bg-red-500 text-white px-3 py-1 mt-[-10px] rounded transform ${showDelete ? 'translate-x-0 opacity-100 static' : 'translate-x-[200px] opacity-0  absolute'} `}
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
      )}
    </div>
  );
}

export default memo(SwipeableMessage);
