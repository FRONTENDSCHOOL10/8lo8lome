import { create } from 'zustand';
import { produce } from 'immer';
import { getRandomMinMax } from '@/utils';
import { createData, getData } from '@/api/axios';
import {
  NINKNAME_REG,
  EMAIL_REG,
  PHONENUMBER_REG,
  PASSWORD_REG,
} from '@/constant.js';

export const useSignupStore = create((set) => {
  const INITIAL_STATE = {
    emailValidation: {
      isEmailButtonDisabled: true,
      message: '',
    },
    nickNameValidation: {
      isNickNameButtonDisabled: true,
    },
    phoneNumberValidation: {
      isVerificationCodeButtonDisabled: true,
      isVerificationCodeInput: false,
      verificationCode: null,
    },
    authMessages: {
      phoneNumberVerification: false,
      passwordVerification: false,
      confirmPassword: false,
      isNickNameExists: '',
    },
    user: {
      nickName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      phoneNumber: '',
      gender: '',
      age: '',
      agreementTerms: {
        over14: false,
        terms: false,
        privacy: false,
        thirdParty: false,
        thirdPartyOptional: false,
        marketingOptional: false,
        smsOptional: false,
      },
    },
    allChecked: false,
    isSignupButtonDisabled: true,
  };

  const updateSignupButtonState = (draft) => {
    const { user, phoneNumberValidation, authMessages, emailValidation } =
      draft;
    draft.isSignupButtonDisabled = !(
      user.nickName &&
      user.email &&
      user.phoneNumber &&
      user.gender &&
      user.age &&
      user.password === user.passwordConfirm &&
      user.agreementTerms.over14 &&
      user.agreementTerms.terms &&
      user.agreementTerms.privacy &&
      user.agreementTerms.thirdParty &&
      phoneNumberValidation.verificationCode &&
      authMessages.isNickNameExists === '사용 가능한 닉네임입니다.' &&
      emailValidation.message === '사용 가능한 이메일입니다.'
    );
  };

  const handleNickNameChange = (value) => {
    const isValid = NINKNAME_REG.test(value);
    if (isValid) {
      set(
        produce((draft) => {
          draft.user.nickName = value;
          draft.nickNameValidation.isNickNameButtonDisabled = !isValid;
          updateSignupButtonState(draft);
        })
      );
    }
  };

  const handleNickNameCheck = async () => {
    const user = useSignupStore.getState().user;
    const data = await getData('users');
    const result = data.items.find((item) => item.nickName === user.nickName);
    set(
      produce((draft) => {
        draft.authMessages.isNickNameExists = result
          ? '이미 존재하는 닉네임입니다.'
          : '사용 가능한 닉네임입니다.';
      })
    );
  };

  const handleEmailChange = (value) => {
    const isValid = EMAIL_REG.test(value);

    set(
      produce((draft) => {
        if (isValid) {
          draft.user.email = value;
          draft.emailValidation.isEmailButtonDisabled = false;
          draft.emailValidation.message = ''; // 유효한 경우 메시지 초기화
        } else {
          draft.user.email = '';
          draft.emailValidation.isEmailButtonDisabled = true; // 이메일 버튼 비활성화
          draft.emailValidation.message = '유효한 이메일을 입력해 주세요.';
        }

        // 이메일 변경 시 버튼 상태 업데이트
        updateSignupButtonState(draft);
      })
    );
  };

  const handleEmailCheck = async () => {
    const userEmail = useSignupStore.getState().user.email;
    const isValid = EMAIL_REG.test(userEmail);

    if (isValid) {
      const data = await getData('users');
      const result = data.items.find((item) => item.email === userEmail);

      set(
        produce((draft) => {
          draft.emailValidation.message = result
            ? '이미 가입 된 이메일입니다.'
            : '사용 가능한 이메일입니다.';

          // 이메일 확인 후 버튼 상태 업데이트
          updateSignupButtonState(draft);
        })
      );
    } else {
      set(
        produce((draft) => {
          draft.emailValidation.message = '유효한 이메일을 입력해 주세요.';
          draft.emailValidation.isEmailButtonDisabled = true;

          // 유효하지 않은 경우 버튼 상태 업데이트
          updateSignupButtonState(draft);
        })
      );
    }
  };

  const handlePhoneNumberChange = (value) => {
    const isValid = PHONENUMBER_REG.test(value);

    set(
      produce((draft) => {
        if (isValid) {
          draft.user.phoneNumber = value;
          draft.phoneNumberValidation.isVerificationCodeButtonDisabled = false; // 유효하면 버튼 활성화
        } else {
          draft.user.phoneNumber = '';
          draft.phoneNumberValidation.isVerificationCodeButtonDisabled = true; // 유효하지 않으면 버튼 비활성화
        }

        // 전화번호 변경 시 버튼 상태 업데이트
        updateSignupButtonState(draft);
      })
    );
  };

  const handlePhoneNumberCheck = () => {
    const random = getRandomMinMax(100000, 999999);

    alert(`인증번호 : ${random}`);
    set(
      produce((draft) => {
        draft.phoneNumberValidation.verificationCode = random;
        draft.phoneNumberValidation.isVerificationCodeInput = true;
        updateSignupButtonState(draft);
      })
    );
  };

  const handleVerificationCodeCheck = (value) => {
    const verificationCode = useSignupStore
      .getState()
      .phoneNumberValidation.verificationCode.toString();

    const isValid = value === verificationCode;

    set(
      produce((draft) => {
        draft.phoneNumberValidation.verificationCodeInput = value;

        if (isValid) {
          updateSignupButtonState(draft);
        } else {
          draft.isSignupButtonDisabled = true;
        }
      })
    );
  };

  const handlePasswordChange = (value) => {
    const isValid = PASSWORD_REG.test(value);
    set(
      produce((draft) => {
        if (isValid) {
          draft.user.password = value;
          draft.authMessages.passwordVerification = false;
        } else {
          draft.authMessages.passwordVerification = true;
        }

        updateSignupButtonState(draft);
      })
    );
  };

  const handlePasswordConfirmChange = (value) => {
    set(
      produce((draft) => {
        draft.user.passwordConfirm = value;
        const { password, passwordConfirm } = draft.user;
        if (password !== passwordConfirm) {
          draft.authMessages.confirmPassword = true;
        } else {
          draft.authMessages.confirmPassword = false;
        }
        updateSignupButtonState(draft);
      })
    );
  };
  const handleGenderCheck = ({ value }) => {
    set(
      produce((draft) => {
        draft.user.gender = value;
      })
    );
  };

  const handleAgeCheck = ({ value }) => {
    set(
      produce((draft) => {
        draft.user.age = value;
      })
    );
  };

  const handleAllCheck = () => {
    set(
      produce((draft) => {
        draft.allChecked = !draft.allChecked;
        Object.keys(draft.user.agreementTerms).forEach(
          (key) => (draft.user.agreementTerms[key] = draft.allChecked)
        );
        updateSignupButtonState(draft);
      })
    );
  };

  const handleCheckboxChange = (target) => {
    const { name } = target;
    set(
      produce((draft) => {
        draft.user.agreementTerms[name] = !draft.user.agreementTerms[name];
        draft.allChecked = Object.values(draft.user.agreementTerms).every(
          Boolean
        );
        updateSignupButtonState(draft);
      })
    );
  };

  const handleSignupButtonClick = async () => {
    const user = useSignupStore.getState().user;

    const userData = {
      nickName: user.nickName,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
      phoneNumber: user.phoneNumber,
      email: user.email,
      gender: user.gender,
      age: user.age,
      agreementTerms: JSON.stringify(user.agreementTerms),
    };
    try {
      const data = await createData('users', userData);
      console.log('response', data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return {
    ...INITIAL_STATE,
    handleMethod: {
      handleNickNameChange,
      handleNickNameCheck,
      handleEmailChange,
      handleEmailCheck,
      handlePhoneNumberChange,
      handlePhoneNumberCheck,
      handleVerificationCodeCheck,
      handlePasswordChange,
      handlePasswordConfirmChange,
      handleAllCheck,
      handleCheckboxChange,
      handleGenderCheck,
      handleAgeCheck,
      handleSignupButtonClick,
    },
  };
});
