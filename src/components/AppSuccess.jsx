import { memo } from 'react';
import { Link } from 'react-router-dom';
import AppMeta from '@/components/AppMeta';

function AppSuccess({ status }) {
  let title, description, svgId, message, subMessage, linkText, linkTo;

  switch (status) {
    case 'password':
      title = '비밀번호 변경 완료 페이지';
      description = '비밀번호 변경 완료 페이지';
      svgId = 'checkmark-circle-click';
      message = '비밀번호 변경 완료!';
      subMessage = '비밀번호가 성공적으로 변경되었습니다.';
      linkText = '로그인 하러 가기';
      linkTo = '/login';
      break;
    case 'payment':
      title = '결제 완료 페이지';
      description = '결제 완료 페이지';
      svgId = 'barbell';
      message = '결제 완료!';
      subMessage = '건강한 몸을 만들 준비가 되었습니다!.';
      linkText = '홈으로 가기';
      linkTo = '/main';
      break;
  }

  return (
    <>
      <AppMeta title={title} description={description} />
      <section className="p-[20px] mt-[50px]">
        <div className="bg-subBg w-full h-[312px] px-2 flex flex-col justify-center items-center">
          <svg
            className={`w-32 text-mainColor`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <use href={`../assets/sprite.svg#${svgId}`} />
          </svg>
          <strong className="text-f18 mt-[28px] mb-[12px]">{message}</strong>
          <p className="text-f12">{subMessage}</p>
        </div>
        <Link
          to={linkTo}
          className="text-center block border border-1 border-mainColor py-s14 rounded mt-[100px]"
        >
          {linkText}
        </Link>
      </section>
    </>
  );
}

export default memo(AppSuccess);
