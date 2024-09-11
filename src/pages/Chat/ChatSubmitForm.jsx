import { useParams } from 'react-router-dom';
import { useChatStore } from '@/stores/chatStore';
import { useId, useState } from 'react';

function ChatSubmitForm() {
  const { roomId } = useParams();
  const [inputValue, setInputValue] = useState('');
  const inputId = useId();
  const { sendMessage, getNewMessage, newMessage } = useChatStore((s) => ({
    sendMessage: s.sendMessage,
    getNewMessage: s.getNewMessage,
    newMessage: s.newMessage,
  }));

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(roomId);
      setInputValue('');
    }
  };

  const handleGetNewMessage = (e) => {
    setInputValue(e.target.value);
    getNewMessage(e.target.value);
  };
  return (
    <footer>
      <form
        className="flex px-4 py-[14px] gap-2 w-[339px] fixed bottom-[129px] bg-subBg border-t border-b border-solid border-white"
        onSubmit={handleSendMessage}
      >
        <div className="w-[900%]">
          <input
            className="rounded-full border border-solid border-white text-white bg-transparent p-s10 text-f14 w-[100%]"
            onChange={handleGetNewMessage}
            placeholder="메시지를 입력하세요"
            id={inputId}
            value={inputValue}
          />
          <label htmlFor={inputId} className="sr-only">
            메시지
          </label>
        </div>
        <button type="submit">
          <svg
            className={`w-5 h-5 text-mainColor`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <use href={`../assets/sprite.svg#send`} />
          </svg>
        </button>
      </form>
    </footer>
  );
}

export default ChatSubmitForm;
