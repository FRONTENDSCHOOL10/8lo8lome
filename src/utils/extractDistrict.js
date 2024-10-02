export const extractDistrict = (address) => {
  // 주소를 공백을 기준으로 나눈 후, '구'나 '시'가 포함된 위치까지 추출
  const addressParts = address.split(' ');

  // '구' 또는 '시'로 끝나는 부분을 찾고 그 이전까지 추출
  const endIndex = addressParts.findIndex(
    (part) => part.includes('구') || part.includes('시')
  );

  // '구'가 포함된 부분까지 잘라내어 반환
  if (endIndex !== -1) {
    return addressParts.slice(0, endIndex + 1).join(' ');
  }
  // '구'가 없으면 전체 반환 (필요에 따라 동으로 처리 가능)
  return address;
};
