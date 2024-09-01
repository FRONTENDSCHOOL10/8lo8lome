import { AppButton, AppHeader, AppInput } from '@/components';
import { useState } from 'react';
export default function Signup() {
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    over14: false,
    terms: false,
    privacy: false,
    thirdParty: false,
    thirdPartyOptional: false,
    marketingOptional: false,
    smsOptional: false,
  });
  // 모두 동의 체크박스 상태 변경
  const handleAllCheck = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    setCheckedItems((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = newCheckedState;
        return acc;
      }, {})
    );
  };
  // 개별 체크박스 상태 변경
  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <section className="flex flex-col gap-5 bg-black">
      <AppHeader>회원가입</AppHeader>
      <div className="flex gap-3">
        <AppInput label="닉네임" placeholder="닉네임" isHiddenLabel />
        <AppButton isFilled={false}>중복확인</AppButton>
      </div>
      <div className="flex gap-3">
        <AppInput label="이메일" placeholder="이메일" email isHiddenLabel />

        <AppButton isFilled={false}>중복확인</AppButton>
      </div>
      <div className="flex gap-3">
        <AppInput label="전화번호" placeholder="전화번호" isHiddenLabel />
        <AppButton isFilled={false}>인증받기</AppButton>
      </div>
      <div className="flex gap-3">
        <AppInput
          label="비밀번호"
          placeholder="비밀번호"
          isHiddenLabel
          password
          className={'w-full'}
        />
      </div>
      <div className="flex gap-3">
        <AppInput
          label="비밀번호확인"
          placeholder="비밀번호확인"
          isHiddenLabel
          password
          className={'w-full'}
        />
      </div>
      <h2 className="font-semibold text-lg">성별을 선택해 주세요.</h2>
      <div className="flex gap-3">
        <AppButton isFilled={false} className="py-5">
          남성
        </AppButton>
        <AppButton isFilled={false} className="py-5">
          여성
        </AppButton>
      </div>
      <h2 className="font-semibold text-lg">나이를 선택해 주세요.</h2>
      <div className="grid gap-3 grid-cols-2">
        <AppInput
          radio
          label="10대"
          name="ageGroup"
          defaultValue="10대"
          // checked={selectedAgeGroup === '10대'}
          onChange={(e) => {
            console.log('10대', e.target.checked);
          }}
        />
        <AppInput
          radio
          label="20대"
          name="ageGroup"
          defaultValue="20대"
          // checked={selectedAgeGroup === '20대'}
          onChange={(e) => {
            console.log('20대', e.target.checked);
          }}
        />
        <AppInput
          radio
          label="30대"
          name="ageGroup"
          defaultValue="30대"
          // checked={selectedAgeGroup === '30대'}
          onChange={(e) => {
            console.log('30대', e.target.checked);
          }}
        />
        <AppInput
          radio
          label="40대"
          name="ageGroup"
          defaultValue="40대"
          // checked={selectedAgeGroup === '40대'}
          onChange={(e) => {
            console.log('40대', e.target.checked);
          }}
        />
        <AppInput
          radio
          label="50대"
          name="ageGroup"
          defaultValue="50대"
          // checked={selectedAgeGroup === '50대'}
          onChange={(e) => {
            console.log('50대', e.target.checked);
          }}
        />
        <AppInput
          radio
          label="60대이상"
          name="ageGroup"
          defaultValue="60대이상"
          // checked={selectedAgeGroup === '60대이상'}
          onChange={(e) => {
            console.log('60대', e.target.checked);
          }}
        />
      </div>
      <form>
        <fieldset>
          <legend className="sr-only">동의 사항</legend>
          <AppInput
            checkbox
            label={'모두 동의합니다'}
            checked={allChecked}
            onChange={handleAllCheck}
          />
          <ul>
            <li>
              <AppInput
                checkbox
                label={'[필수] 만 14세 이상입니다.'}
                name="over14"
                checked={checkedItems.over14}
                onChange={handleCheckboxChange}
              />
            </li>
            <li>
              <AppInput
                checkbox
                label={'[필수] 서비스 이용약관 동의'}
                name="terms"
                checked={checkedItems.terms}
                onChange={handleCheckboxChange}
              />
            </li>
            <li>
              <AppInput
                checkbox
                className="py-5"
                label={'[필수] 개인정보 수집 및 서비스 활용 동의'}
                name="privacy"
                checked={checkedItems.privacy}
                onChange={handleCheckboxChange}
              />
            </li>
            <li>
              <AppInput
                checkbox
                label={'[필수] 채널 홈페이지 개인정보 제3자 동의'}
                name="thirdParty"
                checked={checkedItems.thirdParty}
                onChange={handleCheckboxChange}
              />
              <ul className="pl-4 mt-2 border-l">
                <li>
                  <AppInput
                    checkbox
                    label={'[선택] 개인정보 제 3자 제공동의'}
                    name="thirdPartyOptional"
                    checked={checkedItems.thirdPartyOptional}
                    onChange={handleCheckboxChange}
                  />
                </li>
                <li>
                  <AppInput
                    checkbox
                    label={'[선택] 개인정보 수집 및 서비스 활용 동의'}
                    name="marketingOptional"
                    checked={checkedItems.marketingOptional}
                    onChange={handleCheckboxChange}
                  />
                </li>
                <li>
                  <AppInput
                    checkbox
                    label={'[선택] 마케팅 정보 SMS 수신 동의'}
                    name="smsOptional"
                    checked={checkedItems.smsOptional}
                    onChange={handleCheckboxChange}
                  />
                </li>
              </ul>
            </li>
          </ul>
        </fieldset>
      </form>

      <AppButton>회원가입</AppButton>
    </section>
  );
}
