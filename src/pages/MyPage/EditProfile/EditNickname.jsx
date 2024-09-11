import { useState, memo } from 'react';
import { useMyPageStore } from '@/stores/myPageStore';
import { AppButton, AppTextInput, AppAuthMessage } from '@/components';
function EditNickname() {
  return (
    <>
      <article>
        <h2 className="sr-only">닉네임 입력</h2>
        <fieldset className="gap-2 felx">
          <AppTextInput
            label="닉네임"
            className="min-w-[200px]"
            placeholder="닉네임"
            isHiddenLabel
            onChange
            required
          />
          <AppButton isFilled={false} onClick disabled>
            중복확인
          </AppButton>
        </fieldset>
        <AppAuthMessage warning>중복된 닉네임입니다.</AppAuthMessage>
      </article>
    </>
  );
}
export default memo(EditNickname);
