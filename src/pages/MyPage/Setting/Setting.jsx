import { AppHeader, AppStatusPage } from '@/components';
import AppMeta from '@/components/AppMeta';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { useDeleteIdStore } from '@/stores/deleteIdStore';

function Setting() {
  const { handleDeleteUser, isDeleteId } = useDeleteIdStore((s) => ({
    handleDeleteUser: s.handleDeleteUser,
    isDeleteId: s.isDeleteId,
  }));

  if (isDeleteId) {
    return <AppStatusPage status="deleteId" />;
  }

  return (
    <>
      <AppMeta title="설정" description="설정 페이지 입니다." />
      <AppHeader>설정</AppHeader>
      <section
        className="flex items-center justify-center w-340px px-s20 mt-[100px]"
        aria-label="설정목록"
      >
        <ul className="flex flex-col items-start justify-center">
          <li className="flex items-center border-b border-solid py-s20 w-s278 h-s62 border-strokeBlack">
            <button
              to="/SignOut"
              className="flex items-center "
              onClick={handleDeleteUser}
            >
              <svg
                role="icon"
                aria-label="탈퇴"
                className="text-red-600 h-s22 w-s22 mr-s10"
              >
                <use href="/assets/sprite.svg#secession" />
              </svg>
              <p className="font-semibold text-white text-f16 mr-s10">
                탈퇴하기
              </p>
              <svg
                role="icon"
                aria-label="탈퇴 하기로 이동하는 버튼"
                className="text-white w-s18 h-s18"
              >
                <use href="/assets/sprite.svg#arrow-forward" />
              </svg>
            </button>
          </li>
          <li className="flex items-center border-b border-solid py-s20 w-s278 h-s62 border-strokeBlack">
            <Link to="/FindPassword" className="flex items-center ">
              <svg
                role="icon"
                aria-label="비밀번호 변경"
                className="fill-white h-s20 w-s20 mr-s10"
              >
                <use href="/assets/sprite.svg#key" />
              </svg>
              <p className="font-semibold text-white text-f16 mr-s10">
                비밀번호 변경
              </p>
              <svg
                role="icon"
                aria-label="비밀번호 변경 페이지 이동 버튼"
                className="text-white w-s18 h-s18"
              >
                <use href="/assets/sprite.svg#arrow-forward" />
              </svg>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}

export default memo(Setting);
