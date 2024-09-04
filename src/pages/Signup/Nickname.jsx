import { AppButton, AppInput } from '@/components';
import { useSignupStore } from './store';

export function Nickname() {
  const { handleNickNameChange } = useSignupStore((s) => ({
    handleNickNameChange: s.handleMethod.handleNickNameChange,
  }));

  return (
    <article>
      <h2 className="sr-only">닉네임 입력</h2>
      <fieldset className="flex gap-2">
        <AppInput
          label="닉네임"
          placeholder="닉네임"
          isHiddenLabel
          className="min-w-[200px]"
          onChange={handleNickNameChange}
          required
        />
        <AppButton isFilled={false}>중복확인</AppButton>
      </fieldset>
    </article>
  );
}
