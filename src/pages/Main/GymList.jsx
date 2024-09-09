import { AppCheckboxInput } from '@/components';
import { memo } from 'react';
import { useSearchStore } from '@/stores/mainStore';

function GymList() {
  const filterGyms = useSearchStore((state) => state.filterGyms);
  // console.log(filterGyms);
  return (
    <ul className="flex flex-col gap-4">
      {filterGyms.map((item) => {
        const imgUrl = `https://eightloeightlome.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.image[0]}`;

        return (
          <li key={item.id}>
            <a
              href=""
              className="text-white flex gap-[0.625rem]
            bg-subBg rounded p-[0.625rem]"
            >
              <img src={imgUrl} alt="헬스장 사진" width={112} height={78} />

              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <h2 className="text-base">{item.name}</h2>
                  <AppCheckboxInput
                    label={'헬스장 정보 찜하기'}
                    isHiddenLabel
                    // name="over14"
                    // isChecked={over14}
                    // onChange={handleCheckboxChange}
                    unCheckedSvgId="heart-unclick"
                    checkedSvgId="heart-click"
                    checkedColor="text-red-500"
                  />
                </div>

                <p className="text-f12">
                  가격 : {item.oneDayPrice.toLocaleString()}원
                </p>
                <div className="flex justify-between text-[0.625rem] pt-4">
                  <p>{item.address}km</p>
                  <div className="flex items-center gap-1">
                    <svg
                      role="icon"
                      aria-label="별점"
                      className="w-3 h-3 fill-yellow-300"
                    >
                      <use href="/assets/sprite.svg#star" />
                    </svg>

                    <p>{item.rating}</p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default memo(GymList);
