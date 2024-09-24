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
  imgWidth,
  imgHeight,
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
        className={`object-contain bg-subBg rounded mt-s12 mx-s31`}
        width={imgWidth}
        height={imgHeight}
      />
    );
  }

  return (
    <section
      aria-label={ariaLabel}
      className={`flex justify-center ${className}`}
    >
      <Swiper spaceBetween={16} slidesPerView={1} className="w-full ">
        {imgUrl.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt=""
              className={`object-contain bg-subBg rounded`}
              width={imgWidth}
              height={imgHeight}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default memo(AppImageDisplay);
