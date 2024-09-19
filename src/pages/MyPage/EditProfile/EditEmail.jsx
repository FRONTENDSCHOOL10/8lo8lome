import { AppButton, AppTextInput, AppAuthMessage } from '@/components';
import { memo } from 'react';

function EditEmail() {
  return (
    <>
      <article className="px-s20">
        <fieldset className="flex gap-2">
          <legend className="sr-only">이메일 입력</legend>
          <AppTextInput
            label="이메일"
            placeholder="이메일"
            isHiddenLabel
            className="min-w-[208px]"
            required
          />
          <AppButton isFilled={false} disabled>
            중복확인
          </AppButton>
        </fieldset>
        <AppAuthMessage warning>이메일 양식을 입력해 주새요.</AppAuthMessage>
      </article>
    </>
  );
}
export default memo(EditEmail);
