import { AppHeader } from '@/components';
import { AppMeta } from '@/components/AppMeta';

export default function EditProfile() {
  return (
    <>
      <AppMeta title="프로필 편집" description="프로필 편집페이지 입니다." />
      <AppHeader>프로필 변경</AppHeader>
    </>
  );
}