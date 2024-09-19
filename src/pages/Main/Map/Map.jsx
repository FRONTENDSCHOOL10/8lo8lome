import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppCheckboxInput, AppMeta, AppRating, AppNav } from '@/components';
import { useMapStore } from '@/stores/mapStore';
import { mainStore } from '@/stores/mainStore';
import SearchBar from '../SearchBar';
import FilterList from '../FilterList';
import { getPbImageURL } from '@/utils';

export default function Map() {
  const { gymsList, fetchGyms } = useMapStore((s) => ({
    gymsList: s.gymsList,
    fetchGyms: s.fetchGyms,
  }));

  const { wishListChecked, getChecked, locationAddress } = mainStore((s) => ({
    wishListChecked: s.searchInput.wishListChecked,
    getChecked: s.handleMethod.getChecked,
    locationAddress: s.locationAddress,
  }));
  const { latitude, longitude } = locationAddress;
  const [selectedGym, setSelectedGym] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    fetchGyms();
  }, [fetchGyms]);

  const initializeMap = useCallback(
    (gymsList) => {
      if (!window.kakao || !latitude || !longitude) {
        return;
      }

      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 5,
      };
      const map = new window.kakao.maps.Map(container, options);

      // 현재 위치 마커 및 오버레이 추가
      const currentPos = new window.kakao.maps.LatLng(latitude, longitude);

      new window.kakao.maps.CustomOverlay({
        content: `<div style="background:#171717; padding:10px; border-radius:4px; color:#16efa4;">현재 위치</div>`,
        position: currentPos,
        map,
      });

      // 헬스장 마커 추가
      gymsList.forEach((gym) => {
        const position = new window.kakao.maps.LatLng(
          gym.latitude,
          gym.longitude
        );
        const gymMarker = new window.kakao.maps.Marker({
          position,
          map,
          title: gym.name,
        });

        window.kakao.maps.event.addListener(gymMarker, 'click', () => {
          setSelectedGym(gym);
        });
      });
    },
    [latitude, longitude]
  );

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
  }, []);

  useEffect(() => {
    if (mapLoaded && latitude !== undefined && longitude !== undefined) {
      initializeMap(gymsList);
    }
  }, [mapLoaded, latitude, longitude, gymsList, initializeMap]);

  return (
    <>
      <AppMeta title="지도 페이지" description="지도 페이지입니다." />
      <header className="flex items-center gap-2 p-[1.25rem]">
        <h1 className="sr-only">지도 페이지</h1>
        <SearchBar />
      </header>
      <FilterList />
      <div className="flex flex-col px-[1.25rem]">
        <div
          id="map"
          className="w-full max-h-[500px] h-[360px] rounded-lg shadow-lg"
        ></div>
      </div>
      {selectedGym && (
        <div className="fixed px-[1.25rem] bottom-16 left-0 w-full">
          <div
            key={selectedGym.id}
            className="px-s10 flex bg-subBg justify-between  py-s16"
          >
            <Link
              to={`/main/${selectedGym.id}`}
              className="text-white flex gap-s10 rounded items-center flex-1"
              aria-label={`${selectedGym.name} 헬스장 상세 정보 링크`}
            >
              <img
                src={getPbImageURL(selectedGym)[0]}
                alt={`${selectedGym.name} 헬스장 이미지`}
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
                onChange={getChecked}
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
