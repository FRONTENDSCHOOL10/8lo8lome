import { memo, useEffect } from 'react';
import { mainStore } from '@/stores/mainStore';
import FilterLink from './FilterLink';

function FilterList() {
  const {
    updatedFilters,
    selectedLocation,
    locationLoading,
    getCurrentLocation,
    searchLocation,
    handleSelectedFilters,
    getGymsList,
  } = mainStore((s) => ({
    updatedFilters: s.searchInput.updatedFilters,
    getCurrentLocation: s.handleMethod.getCurrentLocation,
    selectedLocation: s.selectedLocation,
    locationLoading: s.locationLoading,
    searchLocation: s.handleMethod.searchLocation,
    handleSelectedFilters: s.handleMethod.handleSelectedFilters,
    getGymsList: s.handleMethod.getGymsList,
    locationAddress: s.locationAddress,
  }));

  useEffect(() => {
    handleSelectedFilters();
  }, [handleSelectedFilters]);

  const handleCurrentLocation = () => {
    getCurrentLocation();
    getGymsList();
  };

  return (
    <section className="px-[1.25rem] flex flex-col gap-1 pb-[0.75rem]">
      <div className="flex justify-between items-center">
        <h1 className="text-f18 font-semibold">내 주변 헬스장</h1>
        <FilterLink />
      </div>
      <div className="flex gap-2 items-center mb-2">
        <button type="button" onClick={searchLocation} title="위치 변경">
          <svg
            role="icon"
            aria-label="위치 변경 아이콘"
            className="w-5 h-5 ml-[-3px] fill-white"
          >
            <use href="/assets/sprite.svg#map" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleCurrentLocation}
          title="현재 위치로 보기"
        >
          <svg
            role="icon"
            aria-label="현재 위치 아이콘"
            className="w-5 h-5 ml-[-3px]"
          >
            <use href="/assets/sprite.svg#locate" />
          </svg>
        </button>
        <span
          aria-label="현재 설정 위치"
          className={`text-f14 font-normal ${locationLoading ? 'text-gray-500' : ''}`}
        >
          {locationLoading ? '위치를 가져오는 중...' : selectedLocation}
        </span>
      </div>
      <ul className="flex text-[0.8125rem] font-medium">
        {updatedFilters.map((item, i) => (
          <li key={i}>
            <p className="whitespace-nowrap">{item}</p>
            {i < updatedFilters.length - 1 && <span>&nbsp;|&nbsp;</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(FilterList);
