import { create } from 'zustand';
import { produce } from 'immer';
import { getRandomMinMax } from '@/utils';
import { createData } from '@/api/axios';

export const useSignupStore = create((set) => {
  const INITIAL_STATE = {
    authMessages: {
      emailVerification: false,
      phoneNumberVerification: false,
      passwordVerification: false,
      passwordConfirm: false,
    },
    user: {
      nickName: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      email: '',
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
    isVerificationCodeButtonDisabled: false,
    isPhoneNumberButtonDisabled: true,
    isSignupButtonDisabled: true,
    verificationCode: null,
    isVerificationCode: false,
  };

  const updateSignupButtonState = (draft) => {
    const { user } = draft;
    draft.isSignupButtonDisabled = !(
      user.nickName &&
      user.email &&
      user.phoneNumber &&
      user.gender &&
      user.age &&
      user.password &&
      user.confirmPassword &&
      draft.verificationCode &&
      draft.isVerificationCode &&
      user.agreementTerms.over14 &&
      user.agreementTerms.terms &&
      user.agreementTerms.privacy &&
      user.agreementTerms.thirdParty
    );
  };

  const setUserField = (field, value) =>
    set(
      produce((draft) => {
        draft.user[field] = value;
        updateSignupButtonState(draft);
      })
    );

  const setPhoneNumberButtonDisabled = (value) =>
    set(
      produce((draft) => {
        draft.isPhoneNumberButtonDisabled = value;
      })
    );

  const activateAuthMessage = (key) => {
    set(
      produce((draft) => {
        draft.authMessages[key] = true;
      })
    );
  };

  const deactivateAuthMessage = (key) => {
    set(
      produce((draft) => {
        draft.authMessages[key] = false;
      })
    );
  };
  const handleNickNameChange = (value) => {
    const nickNameRegex = /^[가-힣a-zA-Z0-9]{1,8}$/;
    if (nickNameRegex.test(value)) {
      setUserField('nickName', value);
    }
    //  else {
    //   alert('특수문자 제외 8글자까지만 작성해주세요');
    // }
  };

  const handleEmailChange = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      setUserField('email', value);
      deactivateAuthMessage('emailVerification');
    } else {
      activateAuthMessage('emailVerification');
    }
  };

  const handlePhoneNumberChange = (value) => {
    const phoneNumberRegex = /^0\d{10}$/;
    if (phoneNumberRegex.test(value)) {
      setUserField('phoneNumber', value);
      deactivateAuthMessage('phoneNumberVerification');
      setPhoneNumberButtonDisabled(false);
    } else {
      activateAuthMessage('phoneNumberVerification');
      setPhoneNumberButtonDisabled(true);
    }
  };

  const handlePhoneNumberCheck = () => {
    const random = getRandomMinMax(100000, 999999);
    alert(`인증번호 : ${random}`);
    set(
      produce((draft) => {
        draft.verificationCode = random;
        draft.isVerificationCodeButtonDisabled = true;
        updateSignupButtonState(draft);
      })
    );
  };

  const handleVerificationCodeCheck = (value) => {
    set(
      produce((draft) => {
        if (value === draft.verificationCode.toString()) {
          draft.isVerificationCode = true;
          updateSignupButtonState(draft);
        }
      })
    );
  };

  const handlePasswordCheck = (value) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>?/-]{8,}$/;
    if (passwordRegex.test(value)) {
      setUserField('password', value);
      deactivateAuthMessage('passwordVerification');
    } else {
      activateAuthMessage('passwordVerification');
    }
  };

  const handlePasswordConfirmCheck = (value) => {
    set(
      produce((draft) => {
        draft.user.confirmPassword = value;
        const { password, confirmPassword } = draft.user;
        if (password !== confirmPassword) {
          draft.authMessages.passwordConfirm = true;
        } else {
          draft.authMessages.passwordConfirm = false;
        }
        updateSignupButtonState(draft);
      })
    );
  };
  const handleGenderCheck = ({ value }) => {
    setUserField('gender', value);
  };

  const handleAgeCheck = ({ value }) => {
    setUserField('age', value);
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
      passwordConfirm: user.confirmPassword,
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
      handleEmailChange,
      handlePhoneNumberChange,
      handlePhoneNumberCheck,
      handleVerificationCodeCheck,
      handlePasswordCheck,
      handlePasswordConfirmCheck,
      handleAllCheck,
      handleCheckboxChange,
      handleGenderCheck,
      handleAgeCheck,
      handleSignupButtonClick,
    },
    authMethod: {
      activateAuthMessage,
      deactivateAuthMessage,
    },
  };
});
