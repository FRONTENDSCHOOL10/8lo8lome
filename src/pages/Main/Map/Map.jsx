import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppCheckboxInput, AppMeta, AppRating, AppNav } from '@/components';
import { useMapStore } from '@/stores/mapStore';
import { mainStore } from '@/stores/mainStore';
import SearchBar from '../SearchBar';
import FilterList from '../FilterList';
import { getPbImageURL } from '@/utils';

export default function Map() {
  const { selectedGym, initializeMap } = useMapStore((s) => ({
    selectedGym: s.selectedGym,
    initializeMap: s.initializeMap,
  }));

  const { wishListChecked, setWishList, locationAddress } = mainStore((s) => ({
    wishListChecked: s.searchInput.wishListChecked,
    setWishList: s.handleMethod.setWishList,
    locationAddress: s.locationAddress,
  }));
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    initializeMap(locationAddress);
  }, [locationAddress, initializeMap]);

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(mapScript);

    mapScript.onload = () => {
      setMapLoaded(true);
    };

    mapScript.onerror = () => {
      console.error('카카오 맵 스크립트 로드 실패');
    };

    return () => {
      document.head.removeChild(mapScript);
    };
  }, []);

  useEffect(() => {
    if (mapLoaded && locationAddress) {
      initializeMap(locationAddress);
    }
  }, [mapLoaded, locationAddress, initializeMap]);

  return (
    <>
      <AppMeta title="지도 페이지" description="지도 페이지입니다." />
      <header className="flex items-center gap-2 p-[1.25rem]">
        <h1 className="sr-only">지도 페이지</h1>
        <SearchBar map />
      </header>
      <FilterList />
      <div className="flex flex-col px-[1.25rem]">
        <div
          id="gymListMap"
          className="w-full max-h-[500px] h-[360px] rounded-lg shadow-lg"
          aria-label="지도"
        ></div>
      </div>
      {selectedGym && selectedGym.name && (
        <div className="fixed px-[1.25rem] bottom-16 left-0 w-full">
          <div
            key={selectedGym.id}
            className="px-s10 flex bg-subBg justify-between py-s16"
          >
            <Link
              to={`/main/${selectedGym.id}`}
              className="text-white flex gap-s10 rounded items-center flex-1"
              aria-label={`${selectedGym.name} 헬스장 상세 정보 링크`}
            >
              <img
                src={getPbImageURL(selectedGym)[0]}
                alt=""
                width={100}
                height={100}
                className="rounded"
              />
              <div className="flex flex-col w-full gap-2">
                <h2 className="text-f16 font-bold">{selectedGym.name}</h2>
                <p className="text-f12 font-normal">{selectedGym.address}</p>
                <p className="text-f12 font-medium text-gray-400">
                  일일권 가격 : {selectedGym.oneDayPrice.toLocaleString()}원
                </p>
              </div>
            </Link>
            <div className="flex flex-col justify-between text-[0.625rem] gap-1 items-end">
              <AppCheckboxInput
                label={'헬스장 정보 찜하기 체크박스'}
                isHiddenLabel
                name={selectedGym.name}
                isChecked={wishListChecked[selectedGym.name]}
                onChange={setWishList}
                unCheckedSvgId="heart-unclick"
                checkedSvgId="heart-click"
                checkedColor="text-red-500"
              />
              <AppRating gymData={selectedGym} className="text-f12" />
            </div>
          </div>
        </div>
      )}
      <AppNav />
    </>
  );
}
