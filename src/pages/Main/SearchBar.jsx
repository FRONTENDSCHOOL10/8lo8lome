import { AppTextInput } from '@/components';
import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { bool } from 'prop-types';
import { useMapStore } from '@/stores/mapStore';

SearchBar.propTypes = {
  map: bool,
};

function SearchBar({ map }) {
  const { handleSearchSubmit, handleSearchInput } = mainStore((s) => ({
    handleSearchSubmit: s.handleMethod.handleSearchSubmit,
    handleSearchInput: s.handleMethod.handleSearchInput,
  }));

  const { handleMapSearchInput, handleMapSubmit } = useMapStore((s) => ({
    handleMapSearchInput: s.handleMapSearchInput,
    handleMapSubmit: s.handleMapSubmit,
  }));

  return (
    <form
      onSubmit={map ? handleMapSubmit : handleSearchSubmit}
      className="flex items-center grow gap-2 py-3 border-b border-solid border-white focus-within:border-borderPrimary"
    >
      <AppTextInput
        label={'검색'}
        isHiddenLabel
        placeholder={
          map ? '헬스장 이름을 입력해 주세요.' : '검색어를 입력해 주세요.'
        }
        className="bg-transparent outline-none text-f14 border-none px-1 py-0 font-normal"
        onChange={map ? handleMapSearchInput : handleSearchInput}
      />
      <button type="submit" aria-label="검색">
        <svg
          role="icon"
          aria-label="검색하기"
          className="w-s30 h-s30 fill-white"
        >
          <use href="/assets/sprite.svg#search" />
        </svg>
      </button>
    </form>
  );
}

export default memo(SearchBar);
