// api.js 또는 requests.js
import axios from 'axios';

// 기본 URL 설정
const BASE_URL = import.meta.env.VITE_PB;

import PocketBase from 'pocketbase';

// GET 요청 함수
export const getData = async (resource, id = '') => {
  try {
    const url = id
      ? `${BASE_URL}/api/collections/${resource}/records/${id}`
      : `${BASE_URL}/api/collections/${resource}/records`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// POST 요청 함수
export const createData = async (resource, data) => {
  try {
    const url = `${BASE_URL}/api/collections/${resource}/records`;
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
    const url = `${BASE_URL}/api/collections/${resource}/records/${id}`;
    const response = await axios.patch(url, data, {
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
    const url = `${BASE_URL}/api/collections/${resource}/records/${id}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

const pb = new PocketBase('https://eightloeightlome.pockethost.io');

// api/CRUD.js

export const requestPasswordReset = async (email) => {
  try {
    await pb.collection('users').requestPasswordReset(email);
  } catch (error) {
    throw new Error(
      '비밀번호 재설정 요청 중 오류가 발생했습니다: ' + error.message
    );
  }
};

export const confirmPasswordReset = async (token, newPassword) => {
  try {
    await pb.collection('users').confirmPasswordReset(token, newPassword);
    console.log('비밀번호 정상 변경');
  } catch (error) {
    throw new Error('비밀번호 재설정 중 오류가 발생했습니다: ' + error.message);
  }
};
