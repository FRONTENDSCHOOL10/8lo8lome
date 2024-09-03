import { AppButton, AppHeader, AppDivider } from '@/components';
import { useSignupStore } from './store.js';
import { Helmet } from 'react-helmet-async';
import { Nickname } from './Nickname.jsx';
import { Email } from './Email.jsx';
import { PhoneNumber } from './PhoneNumber.jsx';
import { Password } from './Password.jsx';
import { PasswordConfirm } from './PasswordConfirm';
import { Gender } from './Gender.jsx';
import { Age } from './Age.jsx';
import { AgreementTerms } from './AgreementTerms.jsx';
// import { getData } from '@/api/axios.js';

export default function Signup() {
  const { isSignupButtonDisabled, handleSignupButtonClick } = useSignupStore(
    (s) => ({
      isSignupButtonDisabled: s.isSignupButtonDisabled,
      handleSignupButtonClick: s.handleMethod.handleSignupButtonClick,
    })
  );

  // const handleGetData = async () => {
  //   try {
  //     const data = await getData('users');
  //     console.log('Fetched Data:', data.items);
  //   } catch (error) {
  //     console.error('Failed to fetch data:', error);
  //   }
  // };
  return (
    <>
      <Helmet>
        <title>다있짐 / 회원가입</title>
        <meta name="description" content="다있짐 회원가입" />
        <meta property="og:title" content="다있짐" />
        <meta property="twitter:title" content="다있짐" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="다있짐 모든 헬스장 정보 여기에 다있짐"
        />
      </Helmet>
      <AppHeader>회원가입</AppHeader>
      <form
        className="bg-black px-[18px] flex flex-col gap-[30px] my-[50px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignupButtonClick();
        }}
      >
        <div className="flex flex-col gap-4">
          <Nickname />
          <Email />
          <PhoneNumber />
          <Password />
          <PasswordConfirm />
        </div>
        <Gender />
        <Age />
        <AppDivider className="w-full" />
        <AgreementTerms />
        <AppButton disabled={isSignupButtonDisabled} submit>
          회원가입
        </AppButton>
      </form>
      {/* <button onClick={handleGetData} type="button">
        데이터 가져오기
      </button> */}
    </>
  );
}
