import { Link } from 'react-router-dom';
import { memo } from 'react';

function FilterLink() {
  return (
    <Link to={'/filter'} aria-label="검색 필터 링크">
      <svg
        role="icon"
        aria-label="검색 필터 아이콘"
        className="w-[1.625rem] h-[1.625rem] fill-white"
      >
        <use href="/assets/sprite.svg#filter-click" />
      </svg>
    </Link>
  );
}

export default memo(FilterLink);
