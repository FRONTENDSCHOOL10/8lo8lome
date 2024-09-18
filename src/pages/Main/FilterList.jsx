import { memo, useState, useEffect } from 'react';
import { mainStore } from '@/stores/mainStore';
import FilterLink from './FilterLink';

function FilterList() {
  const { updatedFilters, handleSelectedFilters } = mainStore((s) => ({
    updatedFilters: s.searchInput.updatedFilters,
    handleSelectedFilters: s.handleMethod.handleSelectedFilters,
  }));

  // 선택된 위치 상태를 관리합니다.
  const [selectedLocation, setSelectedLocation] =
    useState('위치를 불러오는 중...');
  const [loading, setLoading] = useState(true);

  // 현재 위치를 가져오는 함수
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // 카카오 Geocoding API를 사용하여 좌표를 주소로 변환
            const apiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
            const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;
            const response = await fetch(url, {
              headers: {
                Authorization: `KakaoAK ${apiKey}`,
              },
            });

            const data = await response.json();
            if (data.documents && data.documents.length > 0) {
              const address = data.documents[0].address.region_2depth_name;
              setSelectedLocation(address);
              handleSelectedFilters({ latitude, longitude });
            } else {
              setSelectedLocation('주소를 찾을 수 없습니다.');
            }
          } catch (error) {
            console.error('카카오 API 요청에 실패했습니다.', error);
            setSelectedLocation('주소를 가져오는 데 실패했습니다.');
          } finally {
            setLoading(false); // 로딩 종료
          }
        },
        (error) => {
          console.error('현재 위치를 가져오는 데 실패했습니다.', error);
          setSelectedLocation('위치를 가져오는 데 실패했습니다.');
          setLoading(false); // 로딩 종료
        }
      );
    } else {
      setSelectedLocation('Geolocation을 지원하지 않는 브라우저입니다.');
      setLoading(false); // 로딩 종료
    }
  };

  // 컴포넌트가 마운트될 때 현재 위치를 자동으로 가져옵니다.
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <section className="px-[1.25rem] flex flex-col gap-1 pb-[0.75rem]">
      <div className="flex justify-between items-center">
        <h1 className="text-f18 font-semibold">내 주변 헬스장</h1>
        <FilterLink />
      </div>
      {/* 현재 위치 표시 */}
      <div className="flex gap-[0.125rem] items-center mb-2">
        <button
          type="button"
          onClick={() => {
            console.log('체크체크');
          }}
        >
          <svg
            role="icon"
            aria-label="현재 위치 아이콘"
            className="w-5 h-5 ml-[-3px]"
          >
            <use href="/assets/sprite.svg#locate" />
          </svg>
        </button>
        <span
          className={`text-f14 font-normal ${loading ? 'text-gray-500' : ''}`}
        >
          {loading ? '위치를 가져오는 중...' : selectedLocation}
        </span>
      </div>
      {/* 필터 목록 */}
      <ul className="flex text-[0.8125rem] font-medium">
        {updatedFilters.map((item, i) => (
          <li key={i}>
            <span className="whitespace-nowrap">{item}</span>
            {i < updatedFilters.length - 1 && <span>&nbsp;|&nbsp;</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(FilterList);
