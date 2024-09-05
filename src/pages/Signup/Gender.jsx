import { AppRadioInput } from '@/components';
import { useSignupStore } from './signStore';

export function Gender() {
  const { handleGenderCheck, gender } = useSignupStore((s) => ({
    handleGenderCheck: s.handleMethod.handleGenderCheck,
    gender: s.user.gender,
  }));

  return (
    <section>
      <h2 className="font-semibold text-f16 mb-s12">성별을 선택해 주세요.</h2>
      <fieldset className="flex gap-3">
        <AppRadioInput
          label="남성"
          name="genderGroup"
          defaultValue="남성"
          isChecked={gender === '남성'}
          onChange={handleGenderCheck}
          required
        />
        <AppRadioInput
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
