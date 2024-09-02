import { AppButton, AppHeader, AppInput, AppDivider } from '@/components';
import AppAuthMessage from '@/components/AppAuthMessage';
import { useSignupStore } from './store.js';
import { Helmet } from 'react-helmet-async';

export default function Signup() {
  const {
    authMessages,
    checkedItems,
    gender,
    age,
    allChecked,
    handleMethod,
    phoneNumber,
    isShow,
    isPhoneNumberButtonDisabled,
  } = useSignupStore((s) => ({
    phoneNumber: s.phoneNumber,
    checkedItems: s.checkedItems,
    isShow: s.isShow,
    gender: s.gender,
    age: s.age,
    allChecked: s.allChecked,
    isPhoneNumberButtonDisabled: s.isPhoneNumberButtonDisabled,
    authMessages: s.authMessages,
    handleMethod: s.handleMethod,
  }));

  const {
    handleEmailChange,
    handlePhoneNumberChange,
    handlePhoneNumberCheck,
    handlePasswordCheck,
    handlePasswordConfirmCheck,
    handleAllCheck,
    handleCheckboxChange,
    handleGenderCheck,
    handleAgeCheck,
  } = handleMethod;

  const {
    phoneNumberVerification,
    emailVerification,
    passwordVerification,
    passwordConfirm,
  } = authMessages;

  const {
    over14,
    terms,
    privacy,
    thirdParty,
    thirdPartyOptional,
    marketingOptional,
    smsOptional,
  } = checkedItems;

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
          content="다있짐 모든헬스장 정보 여기에 다있짐"
        />
      </Helmet>
      <AppHeader>회원가입</AppHeader>
      <section className="bg-black px-[18px] flex flex-col gap-[50px] my-[50px]">
        <div className="flex flex-col gap-4">
          {/* 닉네임 입력 */}
          <article>
            <h2 className="sr-only">닉네임 입력</h2>
            <fieldset className="flex gap-2">
              <AppInput
                label="닉네임"
                placeholder="닉네임"
                isHiddenLabel
                className="min-w-[200px]"
              />
              <AppButton isFilled={false}>중복확인</AppButton>
            </fieldset>
          </article>
          {/* 이메일 입력 */}
          <article>
            <h2 className="sr-only">이메일 입력</h2>
            <fieldset className="flex gap-2">
              <AppInput
                label="이메일"
                placeholder="이메일"
                email
                isHiddenLabel
                className="min-w-[200px]"
                onChange={handleEmailChange}
              />
              <AppButton isFilled={false}>중복확인</AppButton>
            </fieldset>
            {emailVerification && (
              <AppAuthMessage>이메일 양식이 맞지 않습니다.</AppAuthMessage>
            )}
          </article>
          {/* 전화번호 입력 */}
          <article>
            <h2 className="sr-only">전화번호 입력</h2>
            <fieldset className="flex gap-2">
              <AppInput
                label="전화번호"
                placeholder="전화번호"
                defaultValue={phoneNumber}
                isHiddenLabel
                className="min-w-[200px]"
                onChange={handlePhoneNumberChange}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <AppButton
                isFilled={false}
                onClick={handlePhoneNumberCheck}
                disabled={isPhoneNumberButtonDisabled}
              >
                인증받기
              </AppButton>
            </fieldset>
            {phoneNumberVerification && (
              <AppAuthMessage>전화번호 양식이 맞지 않습니다.</AppAuthMessage>
            )}
            {isShow && (
              <AppInput
                label="인증번호"
                placeholder="인증번호"
                isHiddenLabel
                className={'w-full mt-5'}
              />
            )}
          </article>
          {/* 비밀번호 입력 */}
          <article>
            <h2 className="sr-only">비밀번호 입력</h2>
            <fieldset className="flex gap-3">
              <AppInput
                label="비밀번호"
                placeholder="비밀번호"
                isHiddenLabel
                password
                className={'w-full'}
                onChange={handlePasswordCheck}
              />
            </fieldset>
            {passwordVerification && (
              <AppAuthMessage>
                비밀번호 양식은 문자와 숫자 8글자 이상입니다.
              </AppAuthMessage>
            )}
          </article>
          {/* 비밀번호 확인 입력 */}
          <article>
            <h2 className="sr-only">비밀번호 확인 입력</h2>
            <fieldset className="flex gap-3">
              <AppInput
                label="비밀번호확인"
                placeholder="비밀번호확인"
                isHiddenLabel
                password
                className={'w-full'}
                onChange={handlePasswordConfirmCheck}
              />
            </fieldset>
            {passwordConfirm && (
              <AppAuthMessage>비밀번호가 일치하지 않습니다.</AppAuthMessage>
            )}
          </article>
        </div>
        {/* 성별 선택 */}
        <section>
          <h2 className="font-semibold text-[16px] mb-3">
            성별을 선택해 주세요.
          </h2>
          <fieldset className="flex gap-3">
            <AppInput
              radio
              label="남성"
              name="genderGroup"
              defaultValue="남성"
              isChecked={gender === '남성'}
              onChange={handleGenderCheck}
            />
            <AppInput
              radio
              label="여성"
              name="genderGroup"
              defaultValue="여성"
              isChecked={gender === '여성'}
              onChange={handleGenderCheck}
            />
          </fieldset>
        </section>
        {/* 나이 선택 */}
        <section>
          <h2 className="font-semibold text-[16px] mb-3">
            나이를 선택해 주세요.
          </h2>
          <fieldset className="grid gap-x-3 gap-y-4 grid-cols-2">
            <AppInput
              radio
              label="10대"
              name="ageGroup"
              defaultValue="10대"
              isChecked={age === '10대'}
              onChange={handleAgeCheck}
            />
            <AppInput
              radio
              label="20대"
              name="ageGroup"
              defaultValue="20대"
              isChecked={age === '20대'}
              onChange={handleAgeCheck}
            />
            <AppInput
              radio
              label="30대"
              name="ageGroup"
              defaultValue="30대"
              isChecked={age === '30대'}
              onChange={handleAgeCheck}
            />
            <AppInput
              radio
              label="40대"
              name="ageGroup"
              defaultValue="40대"
              isChecked={age === '40대'}
              onChange={handleAgeCheck}
            />
            <AppInput
              radio
              label="50대"
              name="ageGroup"
              defaultValue="50대"
              isChecked={age === '50대'}
              onChange={handleAgeCheck}
            />
            <AppInput
              radio
              label="60대이상"
              name="ageGroup"
              defaultValue="60대이상"
              isChecked={age === '60대이상'}
              onChange={handleAgeCheck}
            />
          </fieldset>
        </section>
        {/* 동의 사항 */}
        <AppDivider className="w-full" />
        <section>
          <fieldset>
            <legend className="sr-only">동의 사항</legend>
            <AppInput
              checkbox
              label={'모두 동의합니다'}
              isChecked={allChecked}
              onChange={handleAllCheck}
            />
            <ul className="mt-3 flex flex-col gap-1">
              <li>
                <AppInput
                  checkbox
                  label={'[필수] 만 14세 이상입니다.'}
                  name="over14"
                  isChecked={over14}
                  onChange={handleCheckboxChange}
                  className="text-[12px]"
                />
              </li>
              <li>
                <AppInput
                  checkbox
                  label={'[필수] 서비스 이용약관 동의'}
                  name="terms"
                  isChecked={terms}
                  onChange={handleCheckboxChange}
                />
              </li>
              <li>
                <AppInput
                  checkbox
                  className="py-5"
                  label={'[필수] 개인정보 수집 및 서비스 활용 동의'}
                  name="privacy"
                  isChecked={privacy}
                  onChange={handleCheckboxChange}
                />
              </li>
              <li>
                <AppInput
                  checkbox
                  label={'[필수] 채널 홈페이지 개인정보 제3자 동의'}
                  name="thirdParty"
                  isChecked={thirdParty}
                  onChange={handleCheckboxChange}
                />
                <ul className="pl-4 mt-2 border-l flex flex-col gap-1">
                  <li>
                    <AppInput
                      checkbox
                      label={'[선택] 개인정보 제 3자 제공동의'}
                      name="thirdPartyOptional"
                      isChecked={thirdPartyOptional}
                      onChange={handleCheckboxChange}
                    />
                  </li>
                  <li>
                    <AppInput
                      checkbox
                      label={'[선택] 개인정보 수집 및 서비스 활용 동의'}
                      name="marketingOptional"
                      isChecked={marketingOptional}
                      onChange={handleCheckboxChange}
                    />
                  </li>
                  <li>
                    <AppInput
                      checkbox
                      label={'[선택] 마케팅 정보 SMS 수신 동의'}
                      name="smsOptional"
                      isChecked={smsOptional}
                      onChange={handleCheckboxChange}
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </fieldset>
        </section>
        {/* 제출 버튼 */}
        <AppButton
          onClick={(e) => {
            e.preventDefault();
            console.log('회원가입 버튼 클릭');
          }}
          submit
        >
          회원가입
        </AppButton>
      </section>
    </>
  );
}
