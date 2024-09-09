import { useEffect, useState, useRef } from 'react';
import { AppHeader } from '@/components';
import { useSignupStore } from '@/stores/signStore';
import { getData } from '@/api/CRUD';
import pb from '@/api/pb';
import getPbImageURL from '@/utils/getPbImageURL';
import AppMeta from '@/components/AppMeta';
import { memo } from 'react';

function EditProfile() {
  return (
    <>
      <AppMeta title="프로필 편집" description="프로필 편집페이지 입니다." />
      <AppHeader>프로필 변경</AppHeader>
      <section className="w-full pr-s20">
        <div className="flex items-center">
          <span className="rounded-full h-s76 w-s76">
            <img
              className="w-full h-full bg-white rounded-full"
              src=""
              alt="내 프로필 사진"
            />
           
          </span> 
          <svg
              role="icon"
              aria-label="사진 선택"
              className="text-white border border-white border-solid rounded-full bg-subBg h-s18 w-s18"
            >
              <use href="/assets/sprite.svg#camera" />
            </svg>
        </div>
      </section>
    </>
  );
}

export default memo(EditProfile);
