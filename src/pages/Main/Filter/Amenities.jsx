import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { AppCheckboxInput } from '@/components';

function Amenities() {
  const { handleCheckboxChange, amenities } = mainStore((s) => ({
    handleCheckboxChange: s.handleMethod.handleCheckboxChange,
    amenities: s.searchFilter.amenities,
  }));

  const { parking, showerRoom, gxRoom, wifi, locker, clothes } = amenities;

  return (
    <fieldset className="mx-[1.9375rem]">
      <legend className="text-f16 font-semibold py-4 px-s10 mb-4 border-b-2 border-solid border-strokeBlack w-full">
        편의시설
      </legend>
      <ul className="flex gap-4 flex-wrap justify-center">
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
            name="showerRoom"
            isChecked={showerRoom}
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
            label={'Wi-Fi'}
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
            name="locker"
            isChecked={locker}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="amenities"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'운동복'}
            name="clothes"
            isChecked={clothes}
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
