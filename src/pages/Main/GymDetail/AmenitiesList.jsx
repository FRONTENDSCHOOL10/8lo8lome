import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';

function AmenitiesList() {
  const { gymData } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
  }));

  const amenitiesType = {
    parking: ['주차장', 'park'],
    wifi: ['WIFI', 'wifi'],
    showerRoom: ['샤워실', 'shower'],
    locker: ['개인락커', 'locker'],
    clothes: ['운동복', 'shirt'],
    gxRoom: ['GX룸', 'group'],
  };

  return (
    <section className="mx-s31">
      <h3 className="text-f18 font-bold pb-[0.8125rem]">편의시설</h3>

      <ul className="flex gap-s12 justify-center py-[0.5625rem] px-10 flex-wrap">
        {Object.keys(amenitiesType).map((key) => {
          const getAmenityColor = gymData.amenities[key]
            ? 'mainColor'
            : 'white';

          const getAmenityLabel = gymData.amenities[key] ? '보유' : '미보유';

          return (
            <li
              key={key}
              className={`flex flex-col border border-solid border-${getAmenityColor} rounded-md p-s6 gap-s6 w-s58 h-s58 items-center justify-center`}
            >
              <svg
                aria-label={`${amenitiesType[key][0]} ${getAmenityLabel}`}
                className={`w-6 h-6 text-${getAmenityColor} fill-${getAmenityColor}`}
              >
                <use href={`/assets/sprite.svg#${amenitiesType[key][1]}`} />
              </svg>
              <p className={`text-f12 font-semibold text-${getAmenityColor}`}>
                {amenitiesType[key][0]}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default memo(AmenitiesList);
