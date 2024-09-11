import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { AppCheckboxInput } from '@/components';

function PtPrice() {
  const { handleCheckboxChange, ptPrice } = mainStore((s) => ({
    handleCheckboxChange: s.handleMethod.handleCheckboxChange,
    ptPrice: s.searchFilter.ptPrice,
  }));

  const { pt15, pt25, pt30 } = ptPrice;

  return (
    <fieldset className="pl-[1.9375rem] pr-[1.9375rem]">
      <legend className="text-f16 py-4 px-s10 border-b-2 border-solid border-strokeBlack w-full">
        Pt 가격순(10회 기준)
      </legend>
      <ul className="flex gap-4 flex-wrap pt-4 justify-center">
        <li>
          <AppCheckboxInput
            label={'15만원'}
            name="pt15"
            isChecked={pt15}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="ptPrice"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'25만원'}
            name="pt25"
            isChecked={pt25}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="ptPrice"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'30만원'}
            name="pt30"
            isChecked={pt30}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="ptPrice"
          />
        </li>
      </ul>
    </fieldset>
  );
}

export default memo(PtPrice);
