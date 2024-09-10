import { memo, useState, useRef } from 'react';
import { useUserStore } from '@/stores/myPageStore';

function EditImage() {
  const { userData, updateProfile } = useUserStore();
  const [profileImage, setProfileImage] = useState(userData.profileImage);
  const fileInputRef = useRef(null);

  const handleProfileImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      updateProfile(file, null, null, null);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className="mx-auto my-0 w-340px py-s30" onSubmit={handleSubmit}>
        <input
          ref={fileInputRef}
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          onChange={handleProfileImageChange}
        />
        <div className="flex flex-row items-center">
          <button
            type="button"
            onClick={handleImageClick}
            className="relative mx-auto my-30px"
          >
            <img
              className="object-cover border-2 border-white border-solid rounded-full"
              src={profileImage}
              alt="내 프로필 사진"
              width={76}
              height={76}
              style={{ width: '76px', height: '76px' }}
            />
            <svg
              role="icon"
              aria-label="프로필 사진 변경 버튼"
              className="absolute bottom-0 right-0 text-white border-2 border-white border-solid rounded-full z-index-10 w-s30 h-s30 bg-subBg translate-x-4px translate-y-4px p-s6"
            >
              <use href="/assets/sprite.svg#camera" />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}

export default memo(EditImage);
