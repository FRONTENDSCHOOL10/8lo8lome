import { useEffect, useState } from 'react';
import AppMeta from '@/components/AppMeta';
import SearchBar from '../SearchBar';
import FilterLink from '../FilterLink';
import { AppNav } from '@/components';

export default function Map() {
  const [, setSelectedGym] = useState(null);

  const gymsList = [
    {
      id: 1,
      name: '에이블짐',
      latitude: 37.4850209,
      longitude: 126.9019418,
      description: '서울특별시 구로구 디지털로 300 지밸리몰 지하 1층',
      oneDay: 20000,
      img: 'https://lh5.googleusercontent.com/p/AF1QipNgIeiJmzZsLD3_HudtpLHadT1JjLtKDafTou21=w296-h168-n-k-no',
    },
    {
      id: 2,
      name: '짐박스',
      latitude: 37.484679,
      longitude: 126.896229,
      description:
        '서울특별시 구로구 구로동 디지털로32나길 38 서림빌딩 3층, 4층',
      oneDay: 30000,
      img: 'https://lh5.googleusercontent.com/p/AF1QipOb1B98912SSpG5i4LhnKCE5RQ-Bywf0YWtKrBl=w231-h165-n-k-no-nu-pi-9.460034-ya63.86929-ro-1.494209-fo100',
    },
    {
      id: 3,
      name: '웰니스 짐',
      latitude: 37.503209,
      longitude: 126.889855,
      description: '서울특별시 구로구 구로동 도림천로 446',
      oneDay: 25000,
      img: 'https://lh5.googleusercontent.com/p/AF1QipNRtjoO-D1ACXA3Xqzh0xNNrSjlHqDfbkBXseD-=w231-h231-n-k-no-nu',
    },
  ];

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(mapScript);

    mapScript.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.566535, 126.9779692), // 서울
          level: 5,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 현재 위치 가져오기
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const currentPos = new window.kakao.maps.LatLng(
              latitude,
              longitude
            );

            map.setCenter(currentPos);

            // 현재 위치 오버레이 내용
            const currentPositionContent = `
                <div style="background:#171717; padding:10px; border-radius:4px; color:#16efa4;">
                  <p style="font-size:14px;">현재 위치</p>
                </div>
              `;

            // 현재 위치 오버레이 생성
            const currentPositionOverlay = new window.kakao.maps.CustomOverlay({
              content: currentPositionContent,
              map,
              position: currentPos,
            });

            currentPositionOverlay.setMap(map);
          });
        } else {
          alert('현재 위치를 찾을 수 없습니다.');
        }

        // 헬스장 위치에 마커 추가
        gymsList.forEach((gym) => {
          const position = new window.kakao.maps.LatLng(
            gym.latitude,
            gym.longitude
          );

          // 헬스장 마커
          const gymMarker = new window.kakao.maps.Marker({
            position,
            map,
            title: gym.name,
          });

          // 헬스장 마커 클릭 시 정보 표시
          window.kakao.maps.event.addListener(gymMarker, 'click', () => {
            setSelectedGym(gym);
            document.getElementById('info-panel').innerHTML = `
              <div style="padding:10px; color:white; display:flex; justify-content:space-between; gap:10px; background:#1E1E1E; border-radius:4px;">
                <img src="${gym.img}" alt="${gym.name}" style="width:100px; height:100px; object-fit:cover; border-radius:5px;"/>
                <div style="display:flex; flex-direction:column; justify-content:space-around;">
                  <strong>${gym.name}</strong>
                  <p style="font-size:14px">${gym.description}</p>
                  <p style="font-size:12px; color:#9ca3af ;">일일권: ${gym.oneDay.toLocaleString()}원</p>
                </div>
              </div>
            `;
          });
        });
      });
    };
  }, []);

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
          className="w-full max-w-[500px] max-h-[500px] h-[360px] rounded-lg shadow-lg"
        ></div>
      </div>
      <div
        id="info-panel"
        style={{
          position: 'fixed',
          bottom: 60,
          left: 0,
          width: '100%',
          backgroundColor: '#171717',
          padding: '10px',
          zIndex: 1000,
        }}
      >
        <p></p>
      </div>
      <AppNav />
    </>
  );
}
