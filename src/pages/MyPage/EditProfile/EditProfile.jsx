import { AppHeader } from '@/components';
import AppMeta from '@/components/AppMeta';
import EditImage from './EditImage';
import EditNickname from './EditNickname';
import EditEmail from './EditEmail';
// import EditNumber from './EditNumber';
import { memo } from 'react';

function EditProfile() {
  return (
    <>
      <AppMeta title="프로필 편집" description="프로필 편집페이지 입니다." />
      <AppHeader>프로필 변경</AppHeader>
      <EditImage />
      <EditNickname />
      <EditEmail />
      {/* <EditNumber /> */}
    </>
  );
}

export default memo(EditProfile);
