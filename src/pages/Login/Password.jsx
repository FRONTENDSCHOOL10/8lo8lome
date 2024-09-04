import { AppInput } from '@/components';
import { useLoginStore } from './store';

export function Password() {
  const { handlePasswordChange } = useLoginStore((s) => ({
    handlePasswordChange: s.handlePasswordChange,
  }));

  return (
    <div>
      <AppInput
        label="비밀번호"
        password
        isHiddenLabel
        placeholder="비밀번호"
        className={'w-full'}
        onChange={handlePasswordChange}
      />
      {/* <AppAuthMessage>아이디 혹은 비밀번호가 맞지 않습니다.</AppAuthMessage> */}
    </div>
  );
}
