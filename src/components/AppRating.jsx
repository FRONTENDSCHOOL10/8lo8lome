import { memo } from 'react';
import { array, string } from 'prop-types';

AppRating.propTypes = {
  gymData: array,
  className: string,
};

function AppRating({ gymData, className = '' }) {
  return (
    <div className="flex items-center gap-1">
      <svg role="icon" aria-label="별점" className="w-3 h-3 fill-yellow-300">
        <use href="/assets/sprite.svg#star" />
      </svg>
      <p className={`font-normal ${className}`}>{gymData.rating}</p>
    </div>
  );
}

export default memo(AppRating);
