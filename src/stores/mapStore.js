import { create } from 'zustand';
import { produce } from 'immer';
import { mainStore } from './mainStore';
import { geocodeAddress, getUserLocation } from '@/utils';

export const useMapStore = create((set) => {
  const INITIAL_STATE = {
    gymsList: [], // 초기 헬스장 목록
    searchWord: '',
    selectedGym: null,
    map: null, // 카카오 맵 객체 저장
    gymMarkers: [], // 지도 위의 마커들
  };

  // 포켓베이스에서 헬스장 정보를 가져오는 함수
  const fetchGyms = async () => {
    try {
      const { gymsList } = mainStore.getState().searchInput;
      const gymsWithCoords = await Promise.all(
        gymsList.map(async (gym) => {
          try {
            // 주소를 위도와 경도로 변환
            const { latitude, longitude } = await geocodeAddress(gym.address);
            return {
              id: gym.id,
              name: gym.name,
              address: gym.address,
              oneDayPrice: gym.oneDayPrice,
              photo: gym.photo,
              latitude,
              longitude,
              collectionId: gym.collectionId,
              rating: gym.rating,
            };
          } catch (error) {
            console.error('Error geocoding address:', error);
            return {
              id: gym.id,
              name: gym.name,
              address: gym.address,
              oneDayPrice: gym.oneDayPrice,
              photo: gym.photo,
              latitude: null,
              longitude: null,
              collectionId: gym.collectionId,
              rating: gym.rating,
            };
          }
        })
      );
      set(
        produce((draft) => {
          draft.gymsList = gymsWithCoords;
        })
      );
    } catch (error) {
      console.error('Error fetching gyms:', error);
    }
  };

  // 검색어 업데이트 함수
  const handleMapSearchInput = async (value) => {
    set(
      produce((draft) => {
        draft.searchWord = value; // 검색어 업데이트
      })
    );
  };

  // 맵 초기화 및 헬스장 마커 추가
  const initializeMap = async (locationAddress, locationText = '현재위치') => {
    await fetchGyms();
    const { latitude, longitude } = locationAddress;
    const { gymsList } = useMapStore.getState();
    const { currentLatitude, currentLongitude } =
      mainStore.getState().currentLocation;

    if (!window.kakao || !latitude || !longitude) {
      return;
    }

    // 기존 마커 초기화
    set(
      produce((draft) => {
        if (draft.gymMarkers) {
          draft.gymMarkers.forEach((marker) => marker.setMap(null));
        }
        draft.gymMarkers = [];
      })
    );

    const container = document.getElementById('gymListMap');
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(currentLatitude, currentLongitude),
      level: 5,
    };
    const map = new window.kakao.maps.Map(container, options);

    // 현재 위치 마커 및 오버레이 추가
    const currentPos = new window.kakao.maps.LatLng(
      currentLatitude,
      currentLongitude
    );
    new window.kakao.maps.CustomOverlay({
      content: `<div style="background:#171717; padding:10px; border-radius:4px; color:#16efa4;">현재위치</div>`,
      position: currentPos,
      map,
    });

    // 사용자가 전달한 locationText와 locationAddress가 '현재위치'가 아니면 해당 위치로 이동
    if (locationText !== '현재위치') {
      const newCenter = new window.kakao.maps.LatLng(latitude, longitude);
      map.setCenter(newCenter);
      new window.kakao.maps.CustomOverlay({
        content: `<div style="background:#171717; padding:10px; border-radius:4px; color:#16efa4;">${locationText}</div>`,
        position: newCenter,
        map,
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

      // 마커 저장
      set(
        produce((draft) => {
          draft.gymMarkers.push(gymMarker);
        })
      );

      // 마커 클릭 이벤트 핸들러
      window.kakao.maps.event.addListener(gymMarker, 'click', () => {
        set(
          produce((draft) => {
            draft.selectedGym = gym; // 클릭한 헬스장으로 업데이트
          })
        );

        // 클릭한 헬스장으로 맵 중심 이동
        const newCenter = new window.kakao.maps.LatLng(
          gym.latitude,
          gym.longitude
        );
        map.setCenter(newCenter);
      });
    });
  };

  // 맵 제출 처리 함수
  const handleMapSubmit = async (e) => {
    e.preventDefault();
    const { gymsList, searchWord } = useMapStore.getState();

    if (!searchWord.trim()) {
      // searchWord가 공백일 경우 현재 유저의 위치를 가져옴
      const location = await getUserLocation();
      set(
        produce((draft) => {
          draft.selectedGym = location; // 선택된 헬스장을 현재 위치로 설정
        })
      );
      initializeMap(location);
    } else {
      const matchedGym = gymsList.find((gym) =>
        gym.name.toLowerCase().includes(searchWord.toLowerCase())
      );
      set(
        produce((draft) => {
          if (matchedGym) {
            draft.selectedGym = matchedGym; // 선택된 헬스장 업데이트
          } else {
            draft.selectedGym = null; // 매칭되지 않으면 선택된 헬스장 초기화
          }
        })
      );
      initializeMap(matchedGym, '검색위치');
    }
  };

  return {
    ...INITIAL_STATE,
    fetchGyms, // 헬스장 정보를 가져오는 함수 반환
    initializeMap, // 지도 초기화 함수 반환
    handleMapSearchInput, // 검색어 처리 함수 반환
    handleMapSubmit, // 맵 검색 처리 함수 반환
  };
});
