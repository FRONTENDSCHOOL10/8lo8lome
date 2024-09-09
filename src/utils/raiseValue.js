export const raiseValue = (item) => {
  // 객체 또는 배열인지 확인 하고, 아니라면 직접 변환
  if (typeof item !== 'object' || item === null) {
    return item;
  }

  // 배열 처리
  if (Array.isArray(item)) {
    return item.map((subItem) => raiseValue(subItem)); // 배열의 각 요소에 대해 재귀적으로 함수 적용
  }

  // 객체 처리
  const result = {};
  Object.keys(item).forEach((key) => {
    const value = item[key];
    if (typeof value === 'object' && value !== null && '#text' in value) {
      result[key] = value['#text'];
    } else {
      result[key] = raiseValue(value); // 재귀적으로 함수 적용
    }
  });

  return result;
};
