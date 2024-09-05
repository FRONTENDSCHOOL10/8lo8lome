import { useFindIdStore } from './findIdStore';
import { memo } from 'react';

function EmailDisplay() {
  const { email } = useFindIdStore((s) => ({
    email: s.userData.email,
  }));

  return (
    <p className="text-f14 bg-subBg h-[93px] flex justify-center items-center mb-s20">
      이메일은 {email} 입니다.
    </p>
  );
}

export default memo(EmailDisplay);
