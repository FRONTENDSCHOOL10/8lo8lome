import { AppTextInput } from '@/components';
import { memo } from 'react';
import { useSearchStore } from '../../stores/mainStore';

function SearchBar({ onSearch }) {
  // const { inputValue, setInputValue } = useSearchStore((state) => {
  //   state.inputValue, state.setInputValue;
  // }); // 상태 선택
  const inputValue = useSearchStore((state) => state.InputValue);
  const setInputValue = useSearchStore((state) => state.setInputValue); // 상태 업데이트 함수 선택

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center grow gap-3 p-2 border-b-[0.0625rem] border-solid border-white focus-within:border-borderPrimary"
    >
      <AppTextInput
        label={'검색'}
        isHiddenLabel
        placeholder="검색어를 입력해 주세요."
        className="bg-transparent outline-none text-sm border-none"
        // vaule={inputValue}
        onChange={setInputValue}
      />
      <button type="submit" aria-label="검색">
        <svg role="icon" aria-label="검색하기" className="w-6 h-6 fill-white">
          <use href="/assets/sprite.svg#search" />
        </svg>
      </button>
    </form>
  );
}

export default memo(SearchBar);
