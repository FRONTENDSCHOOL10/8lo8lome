import { AppAuthMessage, AppEmailInput } from '@/components';
import { useLoginStore } from './loginStore';

export function Email() {
  const { handleEmailChange, emailVerification } = useLoginStore((s) => ({
    handleEmailChange: s.handleEmailChange,
    emailVerification: s.emailVerification,
  }));

  return (
    <div>
      <AppEmailInput
        label="이메일"
        isHiddenLabel
        placeholder="이메일"
        onChange={handleEmailChange}
        className={'w-full'}
      />
      {emailVerification ? (
        <AppAuthMessage warning>이메일 양식이 맞지 않습니다.</AppAuthMessage>
      ) : null}
    </div>
  );
}
