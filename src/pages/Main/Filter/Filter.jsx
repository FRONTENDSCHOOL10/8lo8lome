import AppMeta from '@/components/AppMeta';
import { AppHeader, AppCheckboxInput } from '@/components';
import { memo } from 'react';

function Filter() {
  const handleStarCheck = ({ value }) => {
    console.log(value);
  };

  return (
    <>
      <AppHeader>필터</AppHeader>
      <AppMeta title="검색 필터 페이지" description="검색 필터 페이지입니다." />

      <ul>
        <li>
          <fieldset className="flex gap-5">
            <legend>별점순</legend>
            <AppCheckboxInput
              label="⭐"
              onChange={handleStarCheck}
              // isChecked={star === '별점 1개'}
              className="p-3 border-2 border-solid border-grayBoder rounded-3xl inline-block"
            />
            <AppCheckboxInput
              label="⭐⭐"
              onChange={handleStarCheck}
              className="p-3 border-2 border-solid border-grayBoder rounded-3xl inline-block"
            />
            <AppCheckboxInput
              label="⭐⭐⭐"
              onChange={handleStarCheck}
              className="p-3 border-2 border-solid border-grayBoder rounded-3xl inline-block"
            />
            <AppCheckboxInput
              label="⭐⭐⭐⭐"
              onChange={handleStarCheck}
              className="p-3 border-2 border-solid border-grayBoder rounded-3xl inline-block"
            />
            <AppCheckboxInput
              label="⭐⭐⭐⭐⭐"
              onChange={handleStarCheck}
              className="p-3 border-2 border-solid border-grayBoder rounded-3xl inline-block"
            />
          </fieldset>
        </li>
      </ul>
    </>
  );
}

export default memo(Filter);
