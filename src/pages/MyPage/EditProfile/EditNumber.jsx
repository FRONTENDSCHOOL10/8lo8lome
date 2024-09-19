import { AppButton, AppTextInput, AppAuthMessage } from '@/components';
import { memo } from 'react';

function EditNumber() {
  return (
    <>
      <article className="px-s20">
        <fieldset className="flex gap-2">
          <legend className="sr-only">전화번호 입력</legend>
          <AppTextInput
            label="전화번호"
            placeholder="전화번호"
            isHiddenLabel
            className="min-w-[208px]"
            required
          />

          <AppButton isFilled={false} disabled>
            중복확인
          </AppButton>
        </fieldset>
        <AppAuthMessage warning>전화번호 양식을 입력해 주세요.</AppAuthMessage>
      </article>
    </>
  );
}
export default memo(EditNumber);
