import { create } from 'zustand';
import { produce } from 'immer';
import { getRandomMinMax } from '@/utils';
import { createData, getFirstListItem } from '@/api/CRUD';
import {
  NICKNAME_REG,
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
      verificationCode: 0,
      isNumberExists: false,
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

  // Signup 버튼의 상태를 업데이트하는 함수
  const updateSignupButtonState = (draft) => {
    // 현재 상태에서 필요한 정보를 추출합니다.
    const { user, phoneNumberValidation, authMessages, emailValidation } =
      draft;

    // 모든 조건이 만족될 때만 Signup 버튼을 활성화합니다.
    draft.isSignupButtonDisabled = !(
      // 닉네임이 존재하고
      (
        user.nickName &&
        // 이메일이 존재하고
        user.email &&
        // 전화번호가 존재하고
        user.phoneNumber &&
        // 성별이 선택되었고
        user.gender &&
        // 나이가 입력되었고
        user.age &&
        // 비밀번호와 비밀번호 확인이 일치하고
        user.password === user.passwordConfirm &&
        // 모든 동의 항목이 체크되었고
        user.agreementTerms.over14 &&
        user.agreementTerms.terms &&
        user.agreementTerms.privacy &&
        user.agreementTerms.thirdParty &&
        // 전화번호 인증 코드가 존재하고
        phoneNumberValidation.verificationCode &&
        // 닉네임 유효성 메시지가 '사용 가능한 닉네임입니다.'일 때
        authMessages.isNickNameExists === '사용 가능한 닉네임입니다.' &&
        // 이메일 유효성 메시지가 '사용 가능한 이메일입니다.'일 때
        emailValidation.message === '사용 가능한 이메일입니다.'
      )
    );
  };

  // 닉네임 변경 핸들러
  const handleNickNameChange = (value) => {
    // 닉네임 유효성 검사
    const isValid = NICKNAME_REG.test(value);

    set(
      produce((draft) => {
        // 닉네임 값을 업데이트
        draft.user.nickName = value;
        // 닉네임 버튼 활성화/비활성화 상태 업데이트
        draft.nickNameValidation.isNickNameButtonDisabled = !isValid;

        // 닉네임 중복 확인 메시지 초기화
        if (draft.authMessages.isNickNameExists) {
          draft.authMessages.isNickNameExists = '';
        }

        // Signup 버튼 상태 업데이트
        updateSignupButtonState(draft);
      })
    );
  };

  // 닉네임 중복 확인 핸들러
  const handleNickNameCheck = async () => {
    // 현재 상태에서 사용자 닉네임을 가져옵니다.
    const userNickName = useSignupStore.getState().user.nickName;

    // 닉네임이 유효할 때만 중복 확인을 진행합니다.
    if (NICKNAME_REG.test(userNickName)) {
      try {
        // 닉네임에 해당하는 첫 번째 사용자 항목을 가져옵니다.
        const result = await getFirstListItem(
          'users',
          'nickName',
          userNickName
        );

        // 상태를 업데이트합니다.
        set(
          produce((draft) => {
            draft.authMessages.isNickNameExists = result
              ? '이미 존재하는 닉네임입니다.' // 닉네임이 중복된 경우 메시지
              : '사용 가능한 닉네임입니다.'; // 닉네임이 중복되지 않은 경우 메시지

            // 중복 확인 후 Signup 버튼의 상태를 업데이트합니다.
            updateSignupButtonState(draft);
          })
        );
      } catch (error) {
        // 데이터 가져오기 실패 시 콘솔에 오류를 기록합니다.
        console.error('Error fetching user data:', error);
      }
    } else {
      // 유효하지 않은 닉네임인 경우 메시지를 설정합니다.
      set(
        produce((draft) => {
          draft.authMessages.isNickNameExists =
            '유효한 닉네임을 입력해 주세요.';
        })
      );
    }
  };

  // 이메일 입력값 변경 핸들러
  const handleEmailChange = (value) => {
    // 이메일 유효성 검사
    const isValid = EMAIL_REG.test(value);

    set(
      produce((draft) => {
        if (isValid) {
          // 이메일이 유효할 경우 상태를 업데이트합니다.
          draft.user.email = value;
          draft.emailValidation.isEmailButtonDisabled = false; // 이메일 버튼 활성화
          draft.emailValidation.message = ''; // 메시지 초기화
        } else {
          // 이메일이 유효하지 않을 경우 상태를 업데이트합니다.
          draft.user.email = ''; // 유효하지 않은 이메일 입력값 제거
          draft.emailValidation.isEmailButtonDisabled = true; // 이메일 버튼 비활성화
          draft.emailValidation.message = '유효한 이메일을 입력해 주세요.'; // 오류 메시지 설정
        }

        // 이메일 변경 시 Signup 버튼의 상태를 업데이트합니다.
        updateSignupButtonState(draft);
      })
    );
  };

  // 이메일 중복 확인 핸들러
  const handleEmailCheck = async () => {
    // 현재 상태에서 사용자 이메일을 가져옵니다.
    const userEmail = useSignupStore.getState().user.email;

    // 이메일 유효성 검사
    const isValid = EMAIL_REG.test(userEmail);

    if (isValid) {
      try {
        // 이메일에 해당하는 첫 번째 사용자 항목을 가져옵니다.
        const result = await getFirstListItem('users', 'email', userEmail);

        // 상태를 업데이트합니다.
        set(
          produce((draft) => {
            draft.emailValidation.message = result
              ? '이미 가입 된 이메일입니다.' // 이메일이 중복된 경우 메시지
              : '사용 가능한 이메일입니다.'; // 이메일이 중복되지 않은 경우 메시지

            draft.emailValidation.isEmailButtonDisabled = false; // 이메일 버튼 활성화

            // 이메일 확인 후 Signup 버튼의 상태를 업데이트합니다.
            updateSignupButtonState(draft);
          })
        );
      } catch (error) {
        // 데이터 가져오기 실패 시 콘솔에 오류를 기록합니다.
        console.error('Error fetching user data:', error);

        // 오류 발생 시 이메일 버튼 비활성화
        set(
          produce((draft) => {
            draft.emailValidation.message =
              '이메일 확인 중 오류가 발생했습니다.';
            draft.emailValidation.isEmailButtonDisabled = true; // 이메일 버튼 비활성화

            // Signup 버튼 상태 업데이트
            updateSignupButtonState(draft);
          })
        );
      }
    } else {
      // 유효하지 않은 이메일인 경우 메시지를 설정합니다.
      set(
        produce((draft) => {
          draft.emailValidation.message = '유효한 이메일을 입력해 주세요.';
          draft.emailValidation.isEmailButtonDisabled = true; // 이메일 버튼 비활성화

          // 유효하지 않은 경우 Signup 버튼 상태 업데이트
          updateSignupButtonState(draft);
        })
      );
    }
  };

  // 전화번호 입력값 변경 핸들러
  const handlePhoneNumberChange = (value) => {
    // 전화번호 유효성 검사
    const isValid = PHONENUMBER_REG.test(value);
    set(
      produce((draft) => {
        if (isValid) {
          // 전화번호가 유효할 경우 상태를 업데이트합니다.
          draft.user.phoneNumber = value;
          draft.phoneNumberValidation.isVerificationCodeButtonDisabled = false; // 인증 코드 버튼 활성화
        } else {
          // 전화번호가 유효하지 않을 경우 상태를 업데이트합니다.
          draft.user.phoneNumber = ''; // 유효하지 않은 전화번호 입력값 제거
          draft.phoneNumberValidation.isVerificationCodeButtonDisabled = true; // 인증 코드 버튼 비활성화
        }

        // 전화번호 변경 시 Signup 버튼의 상태를 업데이트합니다.
        updateSignupButtonState(draft);
      })
    );
  };

  // 전화번호 인증 코드 생성 및 알림 핸들러
  const handlePhoneNumberCheck = async () => {
    // 현재 상태에서 사용자 전화번호를 가져옵니다.
    const userPhoneNumber = useSignupStore.getState().user.phoneNumber;

    try {
      // 전화번호에 해당하는 첫 번째 사용자 항목을 가져옵니다.
      const userExists = await getFirstListItem(
        'users',
        'phoneNumber',
        userPhoneNumber
      );

      // 상태를 업데이트합니다.
      set(
        produce((draft) => {
          if (userExists) {
            // 전화번호가 이미 존재하는 경우
            draft.phoneNumberValidation.isNumberExists = true;
            draft.phoneNumberValidation.isVerificationCodeInput = false; // 인증 코드 입력 필드 비활성화
          } else {
            // 전화번호가 존재하지 않는 경우
            const random = getRandomMinMax(100000, 999999);
            draft.phoneNumberValidation.isNumberExists = false;
            draft.phoneNumberValidation.verificationCode = random; // 인증 코드 저장
            draft.phoneNumberValidation.isVerificationCodeInput = true; // 인증 코드 입력 필드 활성화
          }
          updateSignupButtonState(draft); // Signup 버튼 상태 업데이트
        })
      );
    } catch (error) {
      // 데이터 가져오기 실패 시 콘솔에 오류를 기록합니다.
      console.error('Error checking phone number:', error);

      // 실패 시 상태를 업데이트하여 사용자에게 오류 메시지를 전달합니다.
      set(
        produce((draft) => {
          draft.phoneNumberValidation.isNumberExists = false;
          draft.phoneNumberValidation.isVerificationCodeInput = false; // 인증 코드 입력 필드 비활성화
          draft.phoneNumberValidation.errorMessage =
            '전화번호 확인 중 오류가 발생했습니다.';
          updateSignupButtonState(draft); // Signup 버튼 상태 업데이트
        })
      );
    }
  };

  // 인증 코드 확인 핸들러
  const handleVerificationCodeCheck = (value) => {
    // 현재 상태에서 저장된 인증 코드를 문자열로 가져옵니다.
    const verificationCode = useSignupStore
      .getState()
      .phoneNumberValidation.verificationCode.toString();

    // 사용자가 입력한 인증 코드가 저장된 인증 코드와 일치하는지 확인합니다.
    const isValid = value === verificationCode;

    // 상태를 업데이트하여 입력된 인증 코드의 유효성을 검사합니다.
    set(
      produce((draft) => {
        draft.phoneNumberValidation.verificationCodeInput = value; // 입력된 인증 코드 저장

        if (isValid) {
          // 인증 코드가 유효할 경우, Signup 버튼의 상태를 업데이트합니다.
          updateSignupButtonState(draft);
        } else {
          // 인증 코드가 유효하지 않을 경우, Signup 버튼을 비활성화합니다.
          draft.isSignupButtonDisabled = true;
        }
      })
    );
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (value) => {
    // 입력된 비밀번호가 유효한지 검사합니다. (정규식 사용)
    const isValid = PASSWORD_REG.test(value);

    // 상태를 업데이트하여 비밀번호와 비밀번호 검증 메시지를 처리합니다.
    set(
      produce((draft) => {
        if (isValid) {
          // 비밀번호가 유효할 경우, 상태를 업데이트합니다.
          draft.user.password = value; // 유효한 비밀번호 저장
          draft.authMessages.passwordVerification = false; // 비밀번호 검증 메시지 초기화
        } else {
          // 비밀번호가 유효하지 않을 경우, 검증 메시지를 표시합니다.
          draft.authMessages.passwordVerification = true; // 비밀번호 검증 메시지 설정
        }

        // Signup 버튼의 상태를 업데이트합니다.
        updateSignupButtonState(draft);
      })
    );
  };

  // 비밀번호 확인 변경 핸들러
  const handlePasswordConfirmChange = (value) => {
    // 상태를 업데이트하여 비밀번호 확인과 비밀번호 검증 메시지를 처리합니다.
    set(
      produce((draft) => {
        draft.user.passwordConfirm = value; // 비밀번호 확인 값 저장
        const { password, passwordConfirm } = draft.user;

        // 비밀번호와 비밀번호 확인이 일치하는지 검사합니다.
        if (password !== passwordConfirm) {
          // 비밀번호와 비밀번호 확인이 일치하지 않을 경우, 메시지를 표시합니다.
          draft.authMessages.confirmPassword = true; // 비밀번호 불일치 메시지 설정
        } else {
          // 비밀번호와 비밀번호 확인이 일치할 경우, 메시지를 초기화합니다.
          draft.authMessages.confirmPassword = false; // 비밀번호 일치 메시지 초기화
        }

        // Signup 버튼의 상태를 업데이트합니다.
        updateSignupButtonState(draft);
      })
    );
  };

  // 성별 선택 핸들러
  const handleGenderCheck = ({ value }) => {
    set(
      produce((draft) => {
        // 선택된 성별 값을 상태에 저장합니다.
        draft.user.gender = value;
      })
    );
  };

  // 나이 선택 핸들러
  const handleAgeCheck = ({ value }) => {
    set(
      produce((draft) => {
        // 선택된 나이 값을 상태에 저장합니다.
        draft.user.age = value;
      })
    );
  };

  // 전체 동의 체크박스 핸들러
  const handleAllCheck = () => {
    set(
      produce((draft) => {
        // 전체 동의 체크박스 상태를 반전시킵니다.
        draft.allChecked = !draft.allChecked;
        // 모든 개별 동의 항목의 상태를 전체 동의 상태와 동일하게 설정합니다.
        Object.keys(draft.user.agreementTerms).forEach(
          (key) => (draft.user.agreementTerms[key] = draft.allChecked)
        );
        // 버튼 상태를 업데이트합니다.
        updateSignupButtonState(draft);
      })
    );
  };

  // 개별 체크박스 변경 핸들러
  const handleCheckboxChange = (target) => {
    const { name } = target;
    set(
      produce((draft) => {
        // 특정 동의 항목의 상태를 반전시킵니다.
        draft.user.agreementTerms[name] = !draft.user.agreementTerms[name];
        // 전체 동의 상태를 업데이트합니다. 모든 항목이 체크된 경우 true, 아니면 false로 설정합니다.
        draft.allChecked = Object.values(draft.user.agreementTerms).every(
          Boolean
        );
        // 버튼 상태를 업데이트합니다.
        updateSignupButtonState(draft);
      })
    );
  };

  // 가입 버튼 클릭 핸들러
  const handleSignupButtonClick = async () => {
    const user = useSignupStore.getState().user;

    // 사용자 데이터 객체를 생성합니다.
    const userData = {
      nickName: user.nickName,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
      phoneNumber: user.phoneNumber,
      email: user.email,
      gender: user.gender,
      age: user.age,
      agreementTerms: user.agreementTerms,
    };

    try {
      // 사용자 데이터를 서버에 제출합니다.
      const data = await createData('users', userData);
      console.log('response', data); // 응답 데이터를 콘솔에 출력합니다.
    } catch (error) {
      console.error('Error:', error.message); // 오류 메시지를 콘솔에 출력합니다.
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
