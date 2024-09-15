import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { AppCheckboxInput } from '@/components';

function HealthPrice() {
  const { handleCheckboxChange, healthPrice } = mainStore((s) => ({
    handleCheckboxChange: s.handleMethod.handleCheckboxChange,
    healthPrice: s.searchFilter.healthPrice,
  }));

  const { monthly3, monthly5, monthly6 } = healthPrice;

  return (
    <fieldset className="mx-[1.9375rem]">
      <legend className="text-f16 font-semibold py-4 px-s10 mb-4 border-b-2 border-solid border-strokeBlack w-full">
        헬스 가격순(1개월 기준)
      </legend>
      <ul className="flex justify-center gap-s6">
        <li>
          <AppCheckboxInput
            label={'월 3만원 이하'}
            name="monthly3"
            isChecked={monthly3}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="healthPrice"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'월 5만원 이하'}
            name="monthly5"
            isChecked={monthly5}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="healthPrice"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'월 6만원 이하'}
            name="monthly6"
            isChecked={monthly6}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="healthPrice"
          />
        </li>
      </ul>
    </fieldset>
  );
}

export default memo(HealthPrice);
