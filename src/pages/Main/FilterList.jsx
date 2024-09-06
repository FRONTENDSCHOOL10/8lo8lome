import { memo } from 'react';
import FilterLink from './FilterLink';

function FilterList() {
  return (
    <section className="bg-mainBg p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-f18">내 주변 헬스장</h1>
        <FilterLink />
      </div>

      <div className="flex gap-1 items-center pt-2 pb-3">
        <svg role="icon" aria-label="현재 위치로 검색하기" className="w-5 h-5">
          <use href="/assets/sprite.svg#locate" />
        </svg>
        <span className="text-f14">현재 위치로 찾기</span>
      </div>

      <ul className="flex text-f12 pb-3">
        <li>
          <span className="whitespace-nowrap">별점 4점</span>
          <span>&nbsp;|&nbsp;</span>
        </li>
        <li>
          <span>월 5만원</span>
          <span>&nbsp;|&nbsp;</span>
        </li>
        <li>
          <span>주차장</span>
          <span>&nbsp;|&nbsp;</span>
        </li>
        <li>
          <span>추천순</span>
          <span>&nbsp;|&nbsp;</span>
        </li>
        <li>
          <span>WIFI</span>
        </li>
      </ul>
    </section>
  );
}

export default memo(FilterList);
