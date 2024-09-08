const getPbImageURL = (id, profile) => {
  return `${import.meta.env.VITE_PB_API_URL}/api/files/users/${id}/${profile}`;
};

export default getPbImageURL;
