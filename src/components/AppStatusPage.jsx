import { memo } from 'react';
import { Link } from 'react-router-dom';
import AppMeta from '@/components/AppMeta';
import { string } from 'prop-types';

AppStatusPage.propTypes = {
  status: string.isRequired,
};

function AppStatusPage({ status }) {
  let title, description, position, message, subMessage, linkText, linkTo, alt;

  switch (status) {
    case 'deleteId':
      title = '회원탈퇴 완료 페이지';
      description = '회원탈퇴 완료 페이지입니다.';
      position = 'object-[0px_0px]';
      alt = '우는 이모지';
      message = '회원탈퇴가 완료되었습니다!';
      subMessage = '이용해주셔서 감사합니다.';
      linkText = '홈으로 가기';
      linkTo = '/';
      break;
    case 'logout':
      title = '로그아웃 완료 페이지';
      description = '로그아웃 완료 페이지입니다.';
      position = 'object-[0px_-800px]';
      alt = '자는 이모지';
      message = '로그아웃이 완료되었습니다';
      subMessage = '이용해주셔서 감사합니다.';
      linkText = '홈으로 가기';
      linkTo = '/';
      break;
    case 'passwordChange':
      title = '비밀번호 변경 완료 페이지';
      description = '비밀번호 변경 완료 페이지입니다.';
      position = 'object-[0px_-400px]';
      alt = '웃는 이모지';
      message = '비밀번호 변경 완료!';
      subMessage = '비밀번호가 성공적으로 변경되었습니다.';
      linkText = '로그인 하러 가기';
      linkTo = '/login';
      break;
    case 'payment':
      title = '결제 완료 페이지';
      description = '결제 완료 페이지입니다.';
      position = 'object-[0px_-600px]';
      alt = '눈 하트 이모지';
      message = '결제 완료!';
      subMessage = '건강한 몸을 만들 준비가 되었습니다!';
      linkText = '운동하러 가기';
      linkTo = '/main';
      break;
    case 'notLogin':
      title = '로그인 이동 페이지';
      description = '로그인 이동 페이지입니다.';
      position = 'object-[0px_-200px]';
      alt = '휘파람 부는 이모지';
      message = '미로그인 상태입니다!';
      subMessage = '로그인 후 이용 해주세요.';
      linkText = '홈으로 가기';
      linkTo = '/';
      break;
    case 'signup':
      title = '회원가입 완료 페이지';
      description = '회원가입 완료 페이지입니다.';
      position = 'object-[0px_-400px]';
      alt = '웃는 이모지';
      message = '회원가입이 완료되었습니다!';
      subMessage = '지금 로그인하고 다양한 서비스를 경험해 보세요.';
      linkText = '로그인 하러 가기';
      linkTo = '/login';
      break;
  }

  return (
    <>
      <AppMeta title={title} description={description} />
      <section className="p-[20px] h-[100vh] flex flex-col justify-center items-center ${textColorClass}">
        <img
          src={`/assets/imojiSprite.png`}
          width={200}
          height={200}
          alt={alt}
          className={`w-[200px] h-[200px] object-cover ${position}`}
        />
        <strong className="text-f18 mt-[28px] mb-[12px]">{message}</strong>
        <p className="text-f12">{subMessage}</p>
        <Link
          to={linkTo}
          className={`mt-[100px] w-full px-3 text-center block border border-solid border-mainColor py-s14 rounded `}
        >
          {linkText}
        </Link>
      </section>
    </>
  );
}

export default memo(AppStatusPage);
