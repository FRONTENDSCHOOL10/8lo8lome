const getPbImageURL = (id, profile) => {
  return `${import.meta.env.VITE_PB}/api/files/users/${id}/${profile}`;
};

export default getPbImageURL;
