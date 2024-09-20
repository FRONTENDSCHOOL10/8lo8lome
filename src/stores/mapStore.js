import { create } from 'zustand';
import { produce } from 'immer';
import { mainStore } from './mainStore';
import { geocodeAddress, getUserLocation } from '@/utils';

export const useMapStore = create((set) => {
  const INITIAL_STATE = {
    gymsList: [], // 초기 헬스장 목록
    searchWord: '',
    selectedGym: null,
  };

  // 포켓베이스에서 헬스장 정보를 가져오는 함수
  const fetchGyms = async () => {
    try {
      const { filterGyms } = mainStore.getState().searchInput;
      const gymsWithCoords = await Promise.all(
        filterGyms.map(async (gym) => {
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
    }
  };

  return {
    ...INITIAL_STATE,
    fetchGyms, // 헬스장 정보를 가져오는 함수 반환
    handleMapSearchInput,
    handleMapSubmit,
  };
});
