import { AppButton, AppTextInput, AppAuthMessage } from '@/components';

import { useMyPageStore } from '@/stores/myPageStore';
import { memo } from 'react';

function EditNumber() {
  return (
    <>
      <article className="px-s20">
        <h2 className="sr-only">전화번호 입력</h2>
        <fieldset className="flex gap-2">
          <AppTextInput
            label="전화번호"
            placeholder="전화번호"
            isHiddenLabel
            className="min-w-[208px]"
            onChange
            required
          />

          <AppButton isFilled={false} onclick disabled>
            중복확인
          </AppButton>
        </fieldset>
        <AppAuthMessage warning>전화번호 양식을 입력해 주세요.</AppAuthMessage>
      </article>
    </>
  );
}
export default memo(EditNumber);
