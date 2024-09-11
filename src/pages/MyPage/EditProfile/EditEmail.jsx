import { AppButton, AppTextInput, AppAuthMessage } from '@/components';
import { useMyPageStore } from '@/stores/myPageStore';
import { memo } from 'react';

function EditEmail() {
  return (
    <>
      <article className="px-s20">
        <h2 className="sr-only">이메일 입력</h2>
        <fieldset className="flex gap-2">
          <AppTextInput
            label="이메일"
            placeholder="이메일"
            isHiddenLabel
            className="min-w-[208px]"
            onChange
            required
          />
          <AppButton isFilled={false} onclick disabled>
            중복확인
          </AppButton>
        </fieldset>
        <AppAuthMessage warning>이메일 양식을 입력해 주새요.</AppAuthMessage>
      </article>
    </>
  );
}
export default memo(EditEmail);
