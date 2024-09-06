import { Link } from 'react-router-dom';
import { memo } from 'react';

function FilterLink() {
  return (
    <Link to={'/filter'} aria-label="검색 필터 적용하기">
      <svg role="icon" aria-label="검색 필터" className="w-5 h-5 fill-white">
        <use href="/assets/sprite.svg#filter-click" />
      </svg>
    </Link>
  );
}

export default memo(FilterLink);
