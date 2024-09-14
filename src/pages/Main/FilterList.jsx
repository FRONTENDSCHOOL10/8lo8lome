import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import FilterLink from './FilterLink';

function FilterList() {
  const { handleSelectedFilters } = mainStore((s) => ({
    handleSelectedFilters: s.handleMethod.handleSelectedFilters,
  }));

  handleSelectedFilters();

  return (
    <section className="mx-[1.9375rem] mb-[0.6875rem] px-1">
      <div className="flex justify-between items-center py-1 mb-s10">
        <h1 className="text-f18 font-semibold">내 주변 헬스장</h1>
        <FilterLink />
      </div>

      <div className="flex gap-[0.125rem] items-center mb-2">
        <svg
          role="icon"
          aria-label="현재 위치로 검색하기 아이콘"
          className="w-5 h-5"
        >
          <use href="/assets/sprite.svg#locate" />
        </svg>
        <span className="text-f14 font-normal">현재 위치로 찾기</span>
      </div>

      <ul className="flex text-[0.8125rem] font-medium">
        <li>
          <span className="whitespace-nowrap">WIFI</span>
          <span>&nbsp;|&nbsp;</span>
        </li>

        {/* {searchFilter.map((item) => {
          return console.log(item);
          <li>
            <span className="whitespace-nowrap">{item}</span>
            <span>&nbsp;|&nbsp;</span>
          </li>
        })} */}
      </ul>
    </section>
  );
}

export default memo(FilterList);
