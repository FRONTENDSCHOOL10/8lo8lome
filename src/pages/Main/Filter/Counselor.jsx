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
    <fieldset className="mx-[1.9375rem]">
      <legend className="text-f16 font-semibold py-4 px-s10 mb-4 border-b-2 border-solid border-strokeBlack w-full">
        상담사
      </legend>
      <ul className="flex gap-2 flex-wrap justify-center">
        <li>
          <AppCheckboxInput
            label={'있음'}
            name="available"
            isChecked={available}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="counselor"
            className="w-[8.4375rem] flex justify-center"
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
            className="w-[8.4375rem] flex justify-center"
          />
        </li>
      </ul>
    </fieldset>
  );
}

export default memo(Counselor);
