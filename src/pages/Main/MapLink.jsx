import { Link } from 'react-router-dom';
import { memo } from 'react';

function MapLink() {
  return (
    <Link to={'/map'} aria-label="지도로 보기">
      <svg
        role="icon"
        aria-label="지도로 보기"
        className="w-[1.4375rem] h-[1.4375rem] fill-white"
      >
        <use href="/assets/sprite.svg#map2" />
      </svg>
    </Link>
  );
}

export default memo(MapLink);
