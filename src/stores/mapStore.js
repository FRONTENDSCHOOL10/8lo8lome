import { create } from 'zustand';
import { produce } from 'immer';
import { mainStore } from './mainStore';
import { geocodeAddress } from '@/utils';

export const useMapStore = create((set) => {
  const INITIAL_STATE = {
    gymsList: [], // 초기 헬스장 목록
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
              photo: gym.photo, // 첫 번째 이미지만 사용
              latitude, // 변환된 위도
              longitude, // 변환된 경도
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
              latitude: null, // 변환 실패 시 null로 설정
              longitude: null, // 변환 실패 시 null로 설정
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

  return {
    ...INITIAL_STATE,
    fetchGyms, // 헬스장 정보를 가져오는 함수 반환
  };
});
