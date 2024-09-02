import { create } from 'zustand';
import { produce } from 'immer';
import { getRandomMinMax } from '@/utils';

export const useSignupStore = create((set) => {
  const INITIAL_STATE = {
    authMessages: {
      emailVerification: false,
      phoneNumberVerification: false,
      passwordVerification: false,
      passwordConfirm: false,
    },
    user: {
      username: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      email: '',
    },
    checkedItems: {
      over14: false,
      terms: false,
      privacy: false,
      thirdParty: false,
      thirdPartyOptional: false,
      marketingOptional: false,
      smsOptional: false,
    },
    gender: '',
    age: '',
    allChecked: false,
    isShow: false,
    isPhoneNumberButtonDisabled: true,
  };

  const setUserField = (field, value) =>
    set(
      produce((draft) => {
        draft.user[field] = value;
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
    const phoneNumberRegex = /^0\d{10}$/;
    set(
      produce((draft) => {
        if (
          !draft.user.phoneNumber ||
          !phoneNumberRegex.test(draft.user.phoneNumber)
        ) {
          alert('제대로된 전화번호를 입력해주세요');
        } else {
          const random = getRandomMinMax(100000, 999999);
          alert(`인증번호 : ${random}`);
          draft.isShow = true;
        }
      })
    );
  };

  const handlePasswordCheck = (value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

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
      })
    );
  };
  const handleGenderCheck = ({ value }) => {
    set(
      produce((draft) => {
        draft.gender = value;
      })
    );
  };

  const handleAgeCheck = ({ value }) => {
    set(
      produce((draft) => {
        draft.age = value;
      })
    );
  };

  const handleAllCheck = () => {
    set(
      produce((draft) => {
        draft.allChecked = !draft.allChecked;
        Object.keys(draft.checkedItems).forEach(
          (key) => (draft.checkedItems[key] = draft.allChecked)
        );
      })
    );
  };

  const handleCheckboxChange = (target) => {
    const { name } = target;
    set(
      produce((draft) => {
        draft.checkedItems[name] = !draft.checkedItems[name];
        draft.allChecked = Object.values(draft.checkedItems).every(Boolean);
      })
    );
  };

  return {
    ...INITIAL_STATE,
    handleMethod: {
      handleEmailChange,
      handlePhoneNumberChange,
      handlePhoneNumberCheck,
      handlePasswordCheck,
      handlePasswordConfirmCheck,
      handleAllCheck,
      handleCheckboxChange,
      handleGenderCheck,
      handleAgeCheck,
    },
    authMethod: {
      activateAuthMessage,
      deactivateAuthMessage,
    },
  };
});
