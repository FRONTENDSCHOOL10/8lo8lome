import { AppInput } from '@/components';
import { useSignupStore } from './store';

export function Gender() {
  const { handleGenderCheck, gender } = useSignupStore((s) => ({
    handleGenderCheck: s.handleMethod.handleGenderCheck,
    gender: s.user.gender,
  }));

  return (
    <section>
      <h2 className="font-semibold text-[16px] mb-3">성별을 선택해 주세요.</h2>
      <fieldset className="flex gap-3">
        <AppInput
          radio
          label="남성"
          name="genderGroup"
          defaultValue="남성"
          isChecked={gender === '남성'}
          onChange={handleGenderCheck}
          required
        />
        <AppInput
          radio
          label="여성"
          name="genderGroup"
          defaultValue="여성"
          isChecked={gender === '여성'}
          onChange={handleGenderCheck}
          required
        />
      </fieldset>
    </section>
  );
}
