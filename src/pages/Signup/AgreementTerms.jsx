import { AppInput } from '@/components';
import { useSignupStore } from './store';

export function AgreementTerms() {
  const { handleAllCheck, handleCheckboxChange, allChecked, agreementTerms } =
    useSignupStore((s) => ({
      handleAllCheck: s.handleMethod.handleAllCheck,
      handleCheckboxChange: s.handleMethod.handleCheckboxChange,
      allChecked: s.allChecked,
      agreementTerms: s.user.agreementTerms,
    }));

  const {
    over14,
    terms,
    privacy,
    thirdParty,
    thirdPartyOptional,
    marketingOptional,
    smsOptional,
  } = agreementTerms;

  return (
    <section>
      <fieldset>
        <legend className="sr-only">동의 사항</legend>
        <AppInput
          checkbox
          label={'모두 동의합니다'}
          isChecked={allChecked}
          onChange={handleAllCheck}
          required
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
              required
            />
          </li>
          <li>
            <AppInput
              checkbox
              label={'[필수] 서비스 이용약관 동의'}
              name="terms"
              isChecked={terms}
              onChange={handleCheckboxChange}
              required
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
              required
            />
          </li>
          <li>
            <AppInput
              checkbox
              label={'[필수] 채널 홈페이지 개인정보 제3자 동의'}
              name="thirdParty"
              isChecked={thirdParty}
              onChange={handleCheckboxChange}
              required
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
  );
}
