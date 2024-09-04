// api.js 또는 requests.js
import axios from 'axios';

// 기본 URL 설정
const BASE_URL = import.meta.env.VITE_PB;

// GET 요청 함수
export const getData = async (resource, id = '') => {
  try {
    const url = id
      ? `${BASE_URL}api/collections/${resource}/records/${id}`
      : `${BASE_URL}api/collections/${resource}/records`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// POST 요청 함수
export const createData = async (resource, data) => {
  try {
    const url = `${BASE_URL}/api/collections/${resource}/records`; // 모든 레코드를 생성하는 엔드포인트
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// PUT 요청 함수
export const updateData = async (resource, id, data) => {
  try {
    const url = `${BASE_URL}/api/collections/${resource}/records/${id}`; // 특정 ID의 레코드를 업데이트하는 엔드포인트
    const response = await axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// DELETE 요청 함수
export const deleteData = async (resource, id) => {
  try {
    const url = `${BASE_URL}/api/collections/${resource}/records/${id}`; // 특정 ID의 레코드를 삭제하는 엔드포인트
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
