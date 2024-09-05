import { create } from 'zustand';
import { produce } from 'immer';
import { getData } from '@/api/CRUD';
import { PHONENUMBER_REG } from '@/constant';
import { getRandomMinMax } from '@/utils';

export const useFindIdStore = create((set) => {
  const INITIAL_STATE = {
    phoneNumberVerification: false,
    isVerificationCodeButtonDisabled: true,
    isVerificationCodeInput: false,
    isShowEmail: false,
    verificationCode: null,
    userData: { phoneNumber: '', userVerificationCode: '', email: '' },
  };

  const handlePhoneNumberCheck = () => {
    // 인증 코드로 사용할 랜덤 숫자를 생성합니다. (6자리)
    const random = getRandomMinMax(100000, 999999);
    // 생성된 인증 코드를 사용자에게 알림으로 표시합니다.
    alert(`인증번호 : ${random}`);

    // 상태를 업데이트하여 생성된 인증 코드를 저장하고 인증 코드 입력을 활성화합니다.
    set(
      produce((draft) => {
        draft.userData.userVerificationCode = random; // 생성된 인증 코드 저장
        draft.isVerificationCodeInput = true; // 인증 코드 입력 필드 활성화
      })
    );
  };

  const handlePhoneNumberChange = (value) => {
    set(
      produce((draft) => {
        if (PHONENUMBER_REG.test(value)) {
          draft.userData.phoneNumber = value;
          draft.phoneNumberVerification = false;
          draft.isVerificationCodeButtonDisabled = false;
        } else {
          draft.userData.phoneNumber = '';
          draft.phoneNumberVerification = true;
          draft.isVerificationCodeButtonDisabled = true;
        }
      })
    );
  };

  const handleVerificationCodeChange = (value) => {
    set(
      produce((draft) => {
        draft.verificationCode = value;
      })
    );
  };

  const handleVerificationCodeCheck = async () => {
    try {
      const userVerificationCode = useFindIdStore
        .getState()
        .userData.userVerificationCode.toString();
      const verificationCode = useFindIdStore.getState().verificationCode;
      const userPhoneNumber = useFindIdStore.getState().userData.phoneNumber; // 유저가 입력한 전화번호
      // 데이터 가져오기
      const data = await getData('users');
      set(
        produce((draft) => {
          // 인증번호가 일치하는지 확인
          if (userVerificationCode === verificationCode) {
            // 전화번호가 일치하는 사용자의 이메일 찾기
            const user = data.items.find(
              (item) => item.phoneNumber === userPhoneNumber
            );
            if (user) {
              draft.isShowEmail = true;
              draft.userData.email = user.email; // 이메일 저장
            } else {
              alert('해당 전화번호로 등록된 사용자가 없습니다.');
            }
          } else {
            alert('인증번호가 일치하지 않습니다.');
          }
        })
      );
    } catch (error) {
      console.error('Error during verification:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return {
    ...INITIAL_STATE,
    handlePhoneNumberChange,
    handlePhoneNumberCheck,
    handleVerificationCodeChange,
    handleVerificationCodeCheck,
  };
});
