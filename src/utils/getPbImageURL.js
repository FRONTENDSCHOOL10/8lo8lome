const getPbImageURL = (item) => {
  const { id, photo, collectionId } = item;

  // review가 true로 변환되고, photo 배열의 길이가 2 이상일 경우 URL 배열 반환
  if (Array.isArray(photo) && photo.length >= 2) {
    return photo.map(
      (photoItem) =>
        `${import.meta.env.VITE_PB}/api/files/${collectionId}/${id}/${photoItem}`
    );
  }

  // 기본 URL 반환
  return `${import.meta.env.VITE_PB}/api/files/${collectionId}/${id}/${photo}`;
};

export default getPbImageURL;
