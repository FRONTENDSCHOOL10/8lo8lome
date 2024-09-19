import { memo } from 'react';
import { useLoginStore } from '../../stores/loginStore';
import { AppPasswordInput } from '@/components';

function Password() {
  const { handlePasswordChange } = useLoginStore((s) => ({
    handlePasswordChange: s.handlePasswordChange,
  }));

  return (
    <div>
      <AppPasswordInput
        label="비밀번호"
        isHiddenLabel
        placeholder="비밀번호"
        className={'w-full'}
        onChange={handlePasswordChange}
      />
    </div>
  );
}

export default memo(Password);
