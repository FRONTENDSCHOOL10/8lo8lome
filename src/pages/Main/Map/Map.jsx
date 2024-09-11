import AppMeta from '@/components/AppMeta';
import SearchBar from '../SearchBar';
import FilterLink from '../FilterLink';
import { AppNav } from '@/components';
import { useEffect } from 'react';

export default function Map() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=503ab030d59afabddc67812e5d7261c0&autoload=false';
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map'); // 맵 컨테이너 선택
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 중심좌표 설정
          level: 3, // 확대 레벨
          // tileAnimation: false,
        };
        const map = new window.kakao.maps.Map(container, options); // 지도 생성
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <AppMeta title="지도 페이지" description="지도 페이지입니다." />

      <header className="flex items-center gap-1 m-4">
        <h1 className="sr-only">지도 페이지</h1>

        <SearchBar />
        <FilterLink />
      </header>
      <div className="flex justify-center">
        <div id="map" className="w-[278px] h-[320px] rounded-lg"></div>
      </div>

      <AppNav />
    </>
  );
}
