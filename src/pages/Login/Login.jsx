import { AppButton, AppHeader, AppCheckboxInput } from '@/components';
import { AuthLinks } from './AuthLinks';
import { Email } from './Email';
import { Password } from './Password';
import { useLoginStore } from './store';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();

  const { autoLogin, handleAutoLoginCheck, handleLoginButtonClick } =
    useLoginStore((s) => ({
      autoLogin: s.autoLogin,
      handleAutoLoginCheck: s.handleAutoLoginCheck,
      handleLoginButtonClick: s.handleLoginButtonClick,
    }));

  const handleLogin = async () => {
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
      <AppHeader>로그인</AppHeader>
      <section className="mb-10">
        <h2 className="sr-only">로그인 폼</h2>
        <article className="px-5">
          <form action="" className="my-20 flex flex-col gap-4">
            <Email />
            <Password />
            <AppCheckboxInput
              label="자동 로그인"
              isChecked={autoLogin}
              onChange={handleAutoLoginCheck}
              unCheckedSvgId="checkmark-circle-unclick"
              checkedSvgId="checkmark-circle-click"
            />
          </form>
          <AppButton submit className="mb-[48px]" onClick={handleLogin}>
            로그인
          </AppButton>
          <AuthLinks />
        </article>
      </section>
    </>
  );
}
