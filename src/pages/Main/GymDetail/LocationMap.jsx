import { useEffect, memo, useState } from 'react';
import { mainStore } from '@/stores/mainStore';

function LocationMap() {
  const { gymData, getGymLocation, gymDetailLocation } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
    getGymLocation: s.handleMethod.getGymLocation,
    gymDetailLocation: s.gymDetailLocation,
  }));

  const [mapLoaded, setMapLoaded] = useState(false);

  //지도 스크립트 로드
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

  // GymData 주소로 좌표 가져오기
  useEffect(() => {
    if (gymData?.address) {
      getGymLocation(gymData.address);
    }
  }, [gymData, getGymLocation]);

  //화면에 지도 띄우기
  useEffect(() => {
    if (mapLoaded && gymDetailLocation) {
      const { latitude, longitude } = gymDetailLocation;
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
        draggable: true,
      };
      const map = new window.kakao.maps.Map(container, options);

      // 헬스장 마커 추가
      const position = new window.kakao.maps.LatLng(latitude, longitude);
      new window.kakao.maps.Marker({
        position,
        map,
      });
    }
  }, [mapLoaded, gymDetailLocation]);

  return (
    <section className="mx-s31">
      <h3 className="text-f18 font-bold mb-s10">위치</h3>
      <div id="map" className="h-[10.875rem] bg-purple-300 rounded"></div>
    </section>
  );
}

export default memo(LocationMap);
