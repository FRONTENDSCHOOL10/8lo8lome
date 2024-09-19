import axios from 'axios';

export const geocodeAddress = async (address) => {
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
