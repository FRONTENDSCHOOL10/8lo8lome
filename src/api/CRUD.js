import pb from './pb'; // 또는 'pocketbase' 경로에 맞게 수정

// GET 요청 함수
// 한 개의 데이터 가져오기
export const getData = async (resource, id) => {
  try {
    const response = await pb.collection(resource).getOne(id);
    return response.items;
  } catch (error) {
    return false;
  }
};
// 여러 개의 데이터 가져오기
// getAllData 함수에 정렬 옵션 추가

export const getAllData = async (
  resource,
  sort = '',
  page = 1,
  perPage = 50
) => {
  try {
    const response = await pb
      .collection(resource)
      .getList(page, perPage, { sort });
    return response.items; // 또는 필요한 형태로 데이터 가공
  } catch (error) {
    return false;
  }
};

// 일치하는 데이터 하나 가져오기
export const getFirstListItem = async (resource, field, value) => {
  try {
    // 쿼리 조건을 사용하여 첫 번째 항목을 가져옵니다
    const user = await pb
      .collection(resource)
      .getFirstListItem(`${field}="${value}"`);
    return user;
  } catch (error) {
    return false;
  }
};

// POST 요청 함수
export const createData = async (resource, data) => {
  try {
    const response = await pb.collection(resource).create(data);
    return response;
  } catch (error) {
    return false;
  }
};

// PUT 요청 함수
export const updateData = async (resource, id, data) => {
  try {
    const response = await pb.collection(resource).update(id, data);
    return response;
  } catch (error) {
    return false;
  }
};

// DELETE 요청 함수
export const deleteData = async (resource, id) => {
  try {
    const response = await pb.collection(resource).delete(id);
    return response;
  } catch (error) {
    return false;
  }
};

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
