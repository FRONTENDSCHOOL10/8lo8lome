import { AppButton, AppHeader, AppCheckboxInput } from '@/components';
import AuthLinks from './AuthLinks';
import Email from './Email';
import Password from './Password';
import { useLoginStore } from '../../stores/loginStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AppMeta from '@/components/AppMeta';
import { memo } from 'react';

function Login() {
  const navigate = useNavigate();

  const { autoLogin, handleAutoLoginCheck, handleLoginButtonClick } =
    useLoginStore((s) => ({
      autoLogin: s.autoLogin,
      handleAutoLoginCheck: s.handleAutoLoginCheck,
      handleLoginButtonClick: s.handleLoginButtonClick,
    }));

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const isLoggedIn = await handleLoginButtonClick();
      if (isLoggedIn) {
        toast.success('로그인 되셨습니다!', {
          icon: '👏',
          style: {
            borderRadius: '5px',
            background: 'black',
            color: '#fff',
          },
          duration: 500,
        });
        setTimeout(() => navigate('/main'), 500);
      } else {
        toast.error('이메일 또는 비밀번호를 확인해주세요', {
          style: {
            borderRadius: '5px',
            background: 'black',
            color: '#fff',
          },
          duration: 1000,
        });
      }
    } catch (error) {
      toast.error('로그인 중 오류가 발생했습니다.', {
        style: {
          borderRadius: '5px',
          background: 'black',
          color: '#fff',
        },
        duration: 1000,
      });
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <AppMeta title="로그인 페이지" description="로그인 페이지입니다." />
      <AppHeader>로그인</AppHeader>
      <main className="container flex flex-col gap-s20 pb-s20 mt-[110px]">
        <h2 className="sr-only">로그인 입력</h2>
        <fieldset className="w-full mb-s40">
          <form
            action=""
            className=" flex flex-col gap-4"
            onSubmit={handleLogin}
          >
            <Email />
            <Password />
            <AppCheckboxInput
              label="자동 로그인"
              isChecked={autoLogin}
              onChange={handleAutoLoginCheck}
              unCheckedSvgId="checkmark-circle-unclick"
              checkedSvgId="checkmark-circle-click"
            />
            <AppButton submit className="mt-s20">
              로그인
            </AppButton>
          </form>
        </fieldset>
        <AuthLinks />
      </main>
    </>
  );
}

export default memo(Login);
