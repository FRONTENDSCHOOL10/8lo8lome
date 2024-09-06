import { memo } from 'react';
import { useSignupStore } from '@/stores/signStore';
import { AppCheckboxInput } from '@/components';

function AgreementTerms() {
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
        <AppCheckboxInput
          label={'모두 동의합니다'}
          isChecked={allChecked}
          onChange={handleAllCheck}
          required
          unCheckedSvgId="checkmark-circle-unclick"
          checkedSvgId="checkmark-circle-click"
        />
        <ul className="mt-s12 flex flex-col gap-1">
          <li>
            <AppCheckboxInput
              label={'[필수] 만 14세 이상입니다.'}
              name="over14"
              isChecked={over14}
              onChange={handleCheckboxChange}
              required
              unCheckedSvgId="checkmark-circle-unclick"
              checkedSvgId="checkmark-circle-click"
            />
          </li>
          <li>
            <AppCheckboxInput
              label={'[필수] 서비스 이용약관 동의'}
              name="terms"
              isChecked={terms}
              onChange={handleCheckboxChange}
              required
              unCheckedSvgId="checkmark-circle-unclick"
              checkedSvgId="checkmark-circle-click"
            />
          </li>
          <li>
            <AppCheckboxInput
              label={'[필수] 개인정보 수집 및 서비스 활용 동의'}
              name="privacy"
              isChecked={privacy}
              onChange={handleCheckboxChange}
              required
              unCheckedSvgId="checkmark-circle-unclick"
              checkedSvgId="checkmark-circle-click"
            />
          </li>
          <li>
            <AppCheckboxInput
              label={'[필수] 채널 홈페이지 개인정보 제3자 동의'}
              name="thirdParty"
              isChecked={thirdParty}
              onChange={handleCheckboxChange}
              required
              unCheckedSvgId="checkmark-circle-unclick"
              checkedSvgId="checkmark-circle-click"
            />
            <ul className="pl-s16 mt-s8 flex flex-col gap-1">
              <li>
                <AppCheckboxInput
                  label={'[선택] 개인정보 제 3자 제공동의'}
                  name="thirdPartyOptional"
                  isChecked={thirdPartyOptional}
                  onChange={handleCheckboxChange}
                  required
                  unCheckedSvgId="checkmark-circle-unclick"
                  checkedSvgId="checkmark-circle-click"
                />
              </li>
              <li>
                <AppCheckboxInput
                  label={'[선택] 개인정보 수집 및 서비스 활용 동의'}
                  name="marketingOptional"
                  isChecked={marketingOptional}
                  onChange={handleCheckboxChange}
                  required
                  unCheckedSvgId="checkmark-circle-unclick"
                  checkedSvgId="checkmark-circle-click"
                />
              </li>
              <li>
                <AppCheckboxInput
                  label={'[선택] 마케팅 정보 SMS 수신 동의'}
                  name="smsOptional"
                  isChecked={smsOptional}
                  onChange={handleCheckboxChange}
                  required
                  unCheckedSvgId="checkmark-circle-unclick"
                  checkedSvgId="checkmark-circle-click"
                />
              </li>
            </ul>
          </li>
        </ul>
      </fieldset>
    </section>
  );
}

export default memo(AgreementTerms);
