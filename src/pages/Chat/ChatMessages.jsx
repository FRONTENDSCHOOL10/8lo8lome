import { useChatStore } from '@/stores/chatStore';
import { string } from 'prop-types';
import { memo } from 'react';

ChatMessages.propTypes = {
  roomId: string.isRequired,
};

function ChatMessages({ roomId }) {
  const { currentRoomMessages, userId } = useChatStore((state) => ({
    currentRoomMessages: state.currentRoomMessages[roomId] || [], // 기본값 설정
    userId: state.userId,
  }));

  return (
    <main className="overflow-y-auto p-4 bg-mainBg min-h-[468px] mt-[120px]">
      <div>
        {currentRoomMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === userId ? 'justify-end' : 'justify-start'} p-3`}
          >
            <div
              className={`p-3 rounded-lg shadow-sm text-f14 font-semibold ${
                message.senderId === userId
                  ? 'bg-mainColor text-mainBg'
                  : 'bg-gray-100 text-black'
              }`}
            >
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default memo(ChatMessages);
