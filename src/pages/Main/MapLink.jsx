import { Link } from 'react-router-dom';
import { memo } from 'react';

function MapLink() {
  return (
    <Link to={'/map'} aria-label="지도로 보기 링크">
      <svg
        role="icon"
        aria-label="지도로 보기"
        className="w-7 h-[1.6875rem] fill-white mb-[0.0625rem]"
      >
        <use href="/assets/sprite.svg#map2" />
      </svg>
    </Link>
  );
}

export default memo(MapLink);
