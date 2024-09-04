import { AppAuthMessage, AppInput } from '@/components';
import { useLoginStore } from './store';

export function Email() {
  const { handleEmailChange, emailVerification } = useLoginStore((s) => ({
    handleEmailChange: s.handleEmailChange,
    emailVerification: s.emailVerification,
  }));

  return (
    <div>
      <AppInput
        label="이메일"
        email
        isHiddenLabel
        placeholder="이메일"
        onChange={handleEmailChange}
        className={'w-full'}
      />
      {emailVerification ? (
        <AppAuthMessage>이메일 양식이 맞지 않습니다.</AppAuthMessage>
      ) : null}
    </div>
  );
}
