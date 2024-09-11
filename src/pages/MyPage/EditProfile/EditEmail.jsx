import { AppButton, AppTextInput, AppAuthMessage } from '@/components';
import { useMyPageStore } from '@/stores/myPageStore';
import { memo } from 'react';

function EditEmail() {
  return (
    <>
      <article>
        <h2 className="sr-only">이메일 입력</h2>
        <fieldset className="gap-2 felx">
          <AppTextInput
            label="이메일"
            placeholder="이메일"
            isHiddenLabel
            className="min-w-[200px]"
            onChange
            required
          />
          <AppButton isFilled={false} onClick disabled>
            중복확인
          </AppButton>
        </fieldset>
        <AppAuthMessage warning>중복된 이메일 입니다.</AppAuthMessage>
      </article>
    </>
  );
}
