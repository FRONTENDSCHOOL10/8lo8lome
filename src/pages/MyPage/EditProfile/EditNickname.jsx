import { memo, useState } from 'react';
import { useMyPageStore } from '@/stores/myPageStore';
import { AppButton, AppTextInput, AppAuthMessage } from '@/components';

function EditNickname() {
  return (
    <article className="p-s20">
      <fieldset className="flex gap-2">
        <legend className="sr-only">닉네임 입력</legend>
        <AppTextInput
          label="닉네임"
          placeholder="닉네임 입력"
          isHiddenLabel
          defaultValue // 초기값 설정
          onChange // 값 변경 핸들러
          required
        />
        <AppButton isFilled={false} onClick>
          중복확인 및 변경
        </AppButton>
      </fieldset>
      {<AppAuthMessage warning>이미 사용 중인 닉네임입니다.</AppAuthMessage>}
      {<AppAuthMessage success>사용 가능한 닉네임입니다.</AppAuthMessage>}
    </article>
  );
}

export default memo(EditNickname);
