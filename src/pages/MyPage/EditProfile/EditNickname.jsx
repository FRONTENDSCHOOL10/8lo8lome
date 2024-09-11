import { useState, memo } from 'react';
import { useMyPageStore } from '@/stores/myPageStore';
import { AppButton, AppTextInput, AppAuthMessage } from '@/components';
function EditNickname() {
  return (
    <>
      <article className="px-s20">
        <h2 className="sr-only">닉네임 입력</h2>
        <fieldset className="flex gap-2 ">
          <AppTextInput
            label="닉네임"
            className="min-w-[208px]"
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
