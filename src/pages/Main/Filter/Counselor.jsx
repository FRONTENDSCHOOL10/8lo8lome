import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { AppCheckboxInput } from '@/components';

function Counselor() {
  const { handleCheckboxChange, counselor } = mainStore((s) => ({
    handleCheckboxChange: s.handleMethod.handleCheckboxChange,
    counselor: s.searchFilter.counselor,
  }));

  const { available, notAvailable } = counselor;

  return (
    <fieldset className="pl-[1.9375rem] pr-[1.9375rem]">
      <legend className="text-f16 py-4 px-s10 border-b-2 border-solid border-strokeBlack w-full">
        상담사
      </legend>
      <ul className="flex gap-4 flex-wrap pt-4 justify-center">
        <li>
          <AppCheckboxInput
            label={'있음'}
            name="available"
            isChecked={available}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="counselor"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'없음'}
            name="notAvailable"
            isChecked={notAvailable}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="counselor"
          />
        </li>
      </ul>
    </fieldset>
  );
}

export default memo(Counselor);
