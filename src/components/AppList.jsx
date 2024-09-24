import { mainStore } from '@/stores/mainStore';
import { getPbImageURL } from '@/utils';
import { arrayOf, number, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { AppCheckboxInput, AppRating } from '@/components';
import { memo } from 'react';

AppList.propTypes = {
  items: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired,
      address: string,
      oneDayPrice: number.isRequired,
    })
  ).isRequired,
};

function AppList({ items }) {
  const { wishListChecked, setWishList } = mainStore((s) => ({
    wishListChecked: s.searchInput.wishListChecked,
    setWishList: s.handleMethod.setWishList,
  }));

  return (
    <ul className="flex flex-col gap-4 mb-16 px-[1.25rem]">
      {items.map((item) => {
        const imgUrl = getPbImageURL(item);
        return (
          <li
            key={item.id}
            className="flex bg-subBg justify-between px-s10 py-s16"
          >
            <Link
              to={`/main/${item.id}`}
              className="text-white flex gap-s10
             rounded items-center flex-1"
              aria-label={`${item.name} 상세 정보 링크`}
            >
              <img
                src={imgUrl[0]}
                alt={''}
                width={112}
                height={78}
                style={{ width: '112px', height: '78px' }}
                className="object-cover rounded"
                loading="lazy"
              />
              <div className="flex flex-col w-full gap-2">
                <h2 className="text-f16 font-bold">{item.name}</h2>
                <p className="text-f12 font-normal">{item.address}</p>
                <p className="text-f12 font-medium">
                  일일권 가격 : {item.oneDayPrice.toLocaleString()}원
                </p>
              </div>
            </Link>
            <div className="flex flex-col justify-between text-[0.625rem] gap-1 items-end">
              <AppCheckboxInput
                label={`${item.name} 찜하기 체크박스`}
                isHiddenLabel
                name={item.name}
                isChecked={wishListChecked[item.name]}
                onChange={setWishList}
                unCheckedSvgId="heart-unclick"
                checkedSvgId="heart-click"
                checkedColor="text-red-500"
              />
              <AppRating gymData={item} className="text-f12" />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default memo(AppList);
