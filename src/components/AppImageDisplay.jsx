import { memo } from 'react';
import { getPbImageURL } from '@/utils';
import { object, string } from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

AppImageDisplay.propTypes = {
  item: object,
  ariaLabel: string,
  className: string,
  imgWidth: string,
  imgHeight: string,
};

function AppImageDisplay({
  item,
  ariaLabel = '',
  className = '',
  imgWidth = 'w-s278',
  imgHeight = 'h-s156',
}) {
  if (!item || item.photo.length === 0) {
    return '';
  }

  const imgUrl = getPbImageURL(item);

  if (item.photo.length === 1) {
    return (
      <img
        src={imgUrl}
        alt=""
        className={`${imgWidth} ${imgHeight} bg-subBg rounded mt-s12 mx-s31`}
      />
    );
  }

  return (
    <section
      aria-label={ariaLabel}
      className={`flex justify-center ${className}`}
    >
      <Swiper spaceBetween={16} slidesPerView={1.1} className="max-w-[320px]">
        {imgUrl.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt=""
              className={`${imgWidth} ${imgHeight} bg-subBg rounded`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default memo(AppImageDisplay);
