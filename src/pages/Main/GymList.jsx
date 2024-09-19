import { AppCheckboxInput, AppRating } from '@/components';
import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { getPbImageURL } from '@/utils';
import { Link } from 'react-router-dom';

function GymList() {
  const { filterGyms } = mainStore((s) => ({
    filterGyms: s.searchInput.filterGyms,
  }));

  return (
    <ul className="flex flex-col gap-4 mb-16 px-[1.25rem]">
      {filterGyms.map((item) => {
        const imgUrl = getPbImageURL(item);
        return (
          <li key={item.id} className="relative">
            <div className="absolute top-[0.5625rem] right-2 pl-7 pb-7">
              <AppCheckboxInput
                label={'헬스장 정보 찜하기 체크박스'}
                isHiddenLabel
                // name="over14"
                // isChecked={over14}
                // onChange={handleCheckboxChange}
                unCheckedSvgId="heart-unclick"
                checkedSvgId="heart-click"
                checkedColor="text-red-500"
              />
            </div>
            <Link
              to={`/main/${item.id}`}
              className="flex items-center text-white rounded gap-s10 bg-subBg p-s10"
              aria-label={`${item.name} 헬스장 상세 정보 링크`}
            >
              <img
                src={imgUrl[0]}
                alt={`${item.name} 헬스장 이미지`}
                className="object-cover rounded"
                width={112}
                height={78}
                style={{ width: '112px', height: '78px' }}
              />
              <div className="flex flex-col w-full">
                <h2 className="font-bold text-f16">{item.name}</h2>
                <p className="font-medium text-f12 pt-s6">
                  일일권 가격 : {item.oneDayPrice.toLocaleString()}원
                </p>
                <div className="flex justify-between text-[0.625rem] pt-4 gap-1">
                  <p className="font-normal text-f12">{item.address}</p>
                  <AppRating gymData={item} className="text-f12" />
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default memo(GymList);
