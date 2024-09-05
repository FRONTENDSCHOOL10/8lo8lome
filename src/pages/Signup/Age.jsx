import { AppRadioInput } from '@/components';
import { useSignupStore } from './signStore';

export function Age() {
  const { handleAgeCheck, age } = useSignupStore((s) => ({
    handleAgeCheck: s.handleMethod.handleAgeCheck,
    age: s.user.age,
  }));

  return (
    <section>
      <h2 className="font-semibold text-f16 mb-s12">나이를 선택해 주세요.</h2>
      <fieldset className="grid gap-x-3 gap-y-4 grid-cols-2">
        <AppRadioInput
          label="10대"
          name="ageGroup"
          defaultValue="10대"
          isChecked={age === '10대'}
          onChange={handleAgeCheck}
          required
        />
        <AppRadioInput
          label="20대"
          name="ageGroup"
          defaultValue="20대"
          isChecked={age === '20대'}
          onChange={handleAgeCheck}
          required
        />
        <AppRadioInput
          label="30대"
          name="ageGroup"
          defaultValue="30대"
          isChecked={age === '30대'}
          onChange={handleAgeCheck}
          required
        />
        <AppRadioInput
          label="40대"
          name="ageGroup"
          defaultValue="40대"
          isChecked={age === '40대'}
          onChange={handleAgeCheck}
          required
        />
        <AppRadioInput
          label="50대"
          name="ageGroup"
          defaultValue="50대"
          isChecked={age === '50대'}
          onChange={handleAgeCheck}
          required
        />
        <AppRadioInput
          label="60대이상"
          name="ageGroup"
          defaultValue="60대이상"
          isChecked={age === '60대이상'}
          onChange={handleAgeCheck}
          required
        />
      </fieldset>
    </section>
  );
}
