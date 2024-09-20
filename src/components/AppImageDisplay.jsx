import { memo } from 'react';
import { getPbImageURL } from '@/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { object } from 'prop-types';

AppImageDisplay.propTypes = {
  item: object,
};

function AppImageDisplay({ item }) {
  if (!item || item.photo.length === 0) {
    return '';
  }

  const imgUrl = getPbImageURL(item);

  if (item.photo.length === 1) {
    return (
      <img
        src={imgUrl}
        alt=""
        className="w-s278 h-s156 bg-subBg rounded mt-s12 mx-s31"
      />
    );
  }

  return (
    <section className="flex justify-center mt-s12 ml-s31">
      <Swiper spaceBetween={16} slidesPerView={1.1} className="max-w-[320px]">
        {imgUrl.map((url, index) => (
          <SwiperSlide key={index}>
            <img src={url} alt="" className="w-s278 h-s156 bg-subBg rounded" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default memo(AppImageDisplay);
