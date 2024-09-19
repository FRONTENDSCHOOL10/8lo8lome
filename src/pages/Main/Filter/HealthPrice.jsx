import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { AppCheckboxInput } from '@/components';

function HealthPrice() {
  const { handleCheckboxChange, healthPrice } = mainStore((s) => ({
    handleCheckboxChange: s.handleMethod.handleCheckboxChange,
    healthPrice: s.searchFilter.healthPrice,
  }));

  const { monthly10, monthly15, monthly20 } = healthPrice;

  return (
    <fieldset className="mx-[1.9375rem]">
      <legend className="text-f16 font-semibold py-4 px-s10 mb-4 border-b-2 border-solid border-strokeBlack w-full">
        헬스 가격순(1개월 기준)
      </legend>
      <ul className="flex justify-center gap-s6">
        <li>
          <AppCheckboxInput
            label={'월 10만원'}
            name="monthly10"
            isChecked={monthly10}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="healthPrice"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'월 15만원'}
            name="monthly15"
            isChecked={monthly15}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="healthPrice"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'월 20만원'}
            name="monthly20"
            isChecked={monthly20}
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
