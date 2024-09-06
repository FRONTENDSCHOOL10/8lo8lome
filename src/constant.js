// 닉네임 정규식
export const NICKNAME_REG = /^[가-힣a-zA-Z0-9]{1,8}$/;
// 이메일 정규식
export const EMAIL_REG = /^[^\s@]+@[^\s@]+\.(com|net)$/;
// 핸드폰번호 정규식
export const PHONENUMBER_REG = /^0\d{10}$/;
// 비밀번호 정규식
export const PASSWORD_REG =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>?/-]{8,}$/;
