import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { AppCheckboxInput } from '@/components';

function AgeGroup() {
  const { handleCheckboxChange, ageGroup } = mainStore((s) => ({
    handleCheckboxChange: s.handleMethod.handleCheckboxChange,
    ageGroup: s.searchFilter.ageGroup,
  }));

  const { teenTo20, twentyTo30, thirtyTo40, fortyTo50, fiftyTo60 } = ageGroup;

  return (
    <fieldset className="mx-[1.9375rem]">
      <legend className="text-f16 font-semibold py-4 px-s10 mb-4 border-b-2 border-solid border-strokeBlack w-full">
        연령순
      </legend>
      <ul className="flex gap-2 flex-wrap justify-center">
        <li>
          <AppCheckboxInput
            label={'10~20대'}
            name="teenTo20"
            isChecked={teenTo20}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="ageGroup"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'20~30대'}
            name="twentyTo30"
            isChecked={twentyTo30}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="ageGroup"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'30~40대'}
            name="thirtyTo40"
            isChecked={thirtyTo40}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="ageGroup"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'40~50대'}
            name="fortyTo50"
            isChecked={fortyTo50}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="ageGroup"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'50~60대'}
            name="fiftyTo60"
            isChecked={fiftyTo60}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="ageGroup"
          />
        </li>
      </ul>
    </fieldset>
  );
}

export default memo(AgeGroup);
