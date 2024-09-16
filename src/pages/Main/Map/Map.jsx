import { useEffect, useState } from 'react';
import { useMapStore } from '@/stores/mapStore';
import AppMeta from '@/components/AppMeta';
import SearchBar from '../SearchBar';
import FilterLink from '../FilterLink';
import { AppNav } from '@/components';
import getPbImageURL from '@/utils/getPbImageURL';

export default function Map() {
  const { gymsList, fetchGyms } = useMapStore((s) => ({
    gymsList: s.gymsList,
    fetchGyms: s.fetchGyms,
  }));
  const [selectedGym, setSelectedGym] = useState(null);

  useEffect(() => {
    fetchGyms();
  }, [fetchGyms]);

  const initializeMap = (gymsList) => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.566535, 126.9779692),
        level: 5,
      };
      const map = new window.kakao.maps.Map(container, options);

      // 현재 위치 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const currentPos = new window.kakao.maps.LatLng(latitude, longitude);
          map.setCenter(currentPos);

          const currentPositionOverlay = new window.kakao.maps.CustomOverlay({
            content: `<div style="background:#171717; padding:10px; border-radius:4px; color:#16efa4;">현재 위치</div>`,
            position: currentPos,
            map,
          });
        });
      }

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
    });
  };

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(mapScript);

    mapScript.onload = () => initializeMap(gymsList);
  }, [gymsList]);

  return (
    <>
      <AppMeta title="지도 페이지" description="지도 페이지입니다." />
      <header className="flex items-center gap-2 p-4">
        <h1 className="sr-only">지도 페이지</h1>
        <SearchBar />
        <FilterLink />
      </header>
      <div className="flex justify-center p-4">
        <div
          id="map"
          className="w-full max-h-[500px] h-[360px] rounded-lg shadow-lg"
        ></div>
      </div>
      {selectedGym && (
        <div className="fixed bottom-16 left-0 w-full bg-[#171717] p-2 z-50">
          <div className="flex gap-2">
            <img
              src={getPbImageURL(selectedGym)[0]}
              alt={selectedGym.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-around text-f14">
              <strong>{selectedGym.name}</strong>
              <p>{selectedGym.address}</p>
              <p className="text-gray-400">
                일일권: {selectedGym.oneDayPrice.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
      )}
      <AppNav />
    </>
  );
}
