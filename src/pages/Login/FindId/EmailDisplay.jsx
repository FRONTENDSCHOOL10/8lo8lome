import { useFindStore } from './findStore';

function EmailDisplay() {
  const { email } = useFindStore((s) => ({
    email: s.userData.email,
  }));

  return (
    <p className="text-sm bg-subBg h-[93px] flex justify-center items-center mb-5">
      이메일은 {email} 입니다.
    </p>
  );
}

export default EmailDisplay;
