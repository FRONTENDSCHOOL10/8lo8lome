import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { AppCheckboxInput } from '@/components';

function Amenities() {
  const { handleCheckboxChange, amenities } = mainStore((s) => ({
    handleCheckboxChange: s.handleMethod.handleCheckboxChange,
    amenities: s.searchFilter.amenities,
  }));

  const { parking, shower, gxRoom, wifi, personalLocker, workoutClothes } =
    amenities;

  return (
    <fieldset className="pl-[1.9375rem] pr-[1.9375rem]">
      <legend className="text-f16 py-4 px-s10 border-b-2 border-solid border-strokeBlack w-full">
        편의시설
      </legend>
      <ul className="flex gap-4 flex-wrap pt-4 justify-center">
        <li>
          <AppCheckboxInput
            label={'주차장'}
            name="parking"
            isChecked={parking}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="amenities"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'샤워실'}
            name="shower"
            isChecked={shower}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="amenities"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'GX룸'}
            name="gxRoom"
            isChecked={gxRoom}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="amenities"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'WIFI'}
            name="wifi"
            isChecked={wifi}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="amenities"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'개인락커'}
            name="personalLocker"
            isChecked={personalLocker}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="amenities"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'운동복'}
            name="workoutClothes"
            isChecked={workoutClothes}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="amenities"
          />
        </li>
      </ul>
    </fieldset>
  );
}

export default memo(Amenities);
