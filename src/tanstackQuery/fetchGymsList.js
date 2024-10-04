import { getUserLocation, filterGymsByDistance } from '@/utils'; // 필요한 함수들 가져오기
import { getAllData } from '@/api/CRUD';

// 헬스장 목록을 가져오는 비동기 함수
export const fetchGymsList = async ({ latitude, longitude }) => {
  // 서버에서 헬스장 데이터 가져오기
  const gyms = await getAllData('gyms', '-created');

  // 위치가 없으면 현재 위치로 설정
  if (!latitude || !longitude) {
    const userLocation = await getUserLocation();
    latitude = userLocation.latitude;
    longitude = userLocation.longitude;
  }

  // 헬스장 목록 필터링
  const nearbyGyms = await filterGymsByDistance(gyms, latitude, longitude);

  // 필터링된 헬스장 데이터를 반환
  return { gyms, nearbyGyms, latitude, longitude };
};
