import { memo, useEffect, useState } from 'react';
import { mainStore } from '@/stores/mainStore';
import { AppRating, AppLoading } from '@/components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard, A11y } from 'swiper/modules';
import { getPbImageURL } from '@/utils';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';

function TrainerList() {
  const [isLoading, setIsLoading] = useState(true);
  const {
    gymData,
    trainerList,
    getTrainersFromGymData,
    setTrainerDetailPath,
    setSelectedTrainerId,
  } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
    trainerList: s.searchInput.trainerList,
    getTrainersFromGymData: s.handleMethod.getTrainersFromGymData,
    setTrainerDetailPath: s.handleMethod.setTrainerDetailPath,
    setSelectedTrainerId: s.handleMethod.setSelectedTrainerId,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    const loadTrainerList = async () => {
      if (gymData) {
        try {
          await getTrainersFromGymData(gymData.trainer);
          setTrainerDetailPath('trainers');
        } catch (error) {
          console.error('Error fetching trainer list:', error);
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadTrainerList();
  }, [gymData, getTrainersFromGymData, setTrainerDetailPath]);

  const handleClick = (trainerId) => {
    if (trainerId) {
      setSelectedTrainerId(trainerId);
    } else {
      throw new Error('trianer ID is not exist.');
    }

    navigate('/TrainerDetail');
  };

  return (
    <section className="mx-s31">
      <h3 className="text-f18 font-bold mb-s10">트레이너 정보</h3>

      {isLoading ? (
        <AppLoading isLoading={isLoading} />
      ) : (
        <Swiper
          modules={[Pagination, Keyboard, A11y]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{
            clickable: true,
            el: '.pager',
            enabled: true,
          }}
          keyboard={{ enavled: true, pageUpDown: true }}
          a11y={{
            paginationBulletMessage: '슬라이드 {{index}}',
          }}
          aria-live="polite"
          aria-label="트레이너 리스트 슬라이더"
        >
          {trainerList.map((trainer, index) => {
            const imgUrl = getPbImageURL(trainer);
            const imgUrlArray = Array.isArray(imgUrl) ? imgUrl : [imgUrl];
            return (
              <SwiperSlide key={index}>
                <div className="p-5 bg-subBg rounded-md flex flex-col items-center min-h-[220px] justify-around">
                  <span className="w-64px h-64px">
                    <img
                      className="object-cover rounded-full bg-black border-2 border-solid border-white"
                      src={imgUrlArray[0]}
                      alt={`${trainer.name} 프로필 사진`}
                      style={{ width: '64px', height: '64px' }}
                    />
                  </span>

                  <p className="text-f14 font-semibold py-s10">
                    {trainer.name} 선생님
                  </p>
                  <p className="text-f12 font-normal pb-4 leading-normal">
                    &quot;{trainer.aboutMe}&quot;
                  </p>
                  <div className="w-full flex justify-between">
                    <div className="flex gap-2 items-center">
                      <AppRating gymData={trainer} className="text-f12" />
                      <span className="text-f12 font-semibold">
                        리뷰: {trainer.reviewCount}개
                      </span>
                    </div>

                    <button
                      aria-label={`${trainer.name} 상세 정보 링크 버튼`}
                      className="text-f14 font-semibold inline-flex items-center"
                      onClick={() => handleClick(trainer.id)}
                    >
                      <span>click</span>
                      <svg
                        role="icon"
                        aria-label="상세 정보 링크 아이콘"
                        className="w-s22 h-s22 fill-white"
                      >
                        <use href="/assets/sprite.svg#arrow-forward" />
                      </svg>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          <div className="pager" aria-label="페이지 네비게이션"></div>
        </Swiper>
      )}
    </section>
  );
}

export default memo(TrainerList);
