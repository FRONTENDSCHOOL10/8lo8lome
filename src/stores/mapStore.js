import { create } from 'zustand';
import { produce } from 'immer';
import axios from 'axios';
import { getAllData } from '@/api/CRUD';

// 카카오 Geocoding API 호출 함수
const geocodeAddress = async (address) => {
  const apiKey = import.meta.env.VITE_KAKAO_REST_API_KEY; // 환경 변수에서 API 키 가져오기
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(address)}`;

  try {
    const response = await axios({
      url: url,
      method: 'get',
      headers: {
        Authorization: `KakaoAK ${apiKey}`, // KakaoAK 뒤에 API 키를 입력
      },
    });

    const data = response.data;
    if (data.documents && data.documents.length > 0) {
      const { x, y } = data.documents[0];
      return { latitude: parseFloat(y), longitude: parseFloat(x) };
    } else {
      console.warn('No results found for the provided address.');
      throw new Error('주소를 변환할 수 없습니다.');
    }
  } catch (error) {
    console.error('Error fetching geocode:', error);
    throw new Error('Geocoding API 요청에 실패했습니다.');
  }
};

export const useMapStore = create((set) => {
  const INITIAL_STATE = {
    gymsList: [], // 초기 헬스장 목록
  };

  // 포켓베이스에서 헬스장 정보를 가져오는 함수
  const fetchGyms = async () => {
    try {
      const gyms = await getAllData('gyms');

      // 주소를 위도와 경도로 변환하는 작업
      const gymsWithCoords = await Promise.all(
        gyms.map(async (gym) => {
          try {
            // 주소를 위도와 경도로 변환
            const { latitude, longitude } = await geocodeAddress(gym.address);
            return {
              id: gym.id,
              name: gym.name,
              address: gym.address,
              oneDayPrice: gym.oneDayPrice,
              photo: gym.photo, // 첫 번째 이미지만 사용
              latitude, // 변환된 위도
              longitude, // 변환된 경도
              collectionId: gym.collectionId,
            };
          } catch (error) {
            console.error('Error geocoding address:', error);
            return {
              id: gym.id,
              name: gym.name,
              address: gym.address,
              oneDayPrice: gym.oneDayPrice,
              photo: gym.photo,
              latitude: null, // 변환 실패 시 null로 설정
              longitude: null, // 변환 실패 시 null로 설정
              collectionId: gym.collectionId,
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
