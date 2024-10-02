import { memo } from 'react';
import { AppCheckboxInput } from '@/components';
import { useFilterStore } from '@/stores/filterStore';

function PtPrice() {
  const { handleCheckboxChange, ptPrice } = useFilterStore((s) => ({
    handleCheckboxChange: s.handleMethod.handleCheckboxChange,
    ptPrice: s.searchFilter.ptPrice,
  }));

  const { pt50, pt60, pt70 } = ptPrice;

  return (
    <fieldset className="mx-[1.9375rem]">
      <legend className="text-f16 font-semibold py-4 px-s10 mb-4 border-b-2 border-solid border-strokeBlack w-full">
        Pt 가격순(10회 기준)
      </legend>
      <ul className="flex justify-center gap-s6">
        <li>
          <AppCheckboxInput
            label={'50만원'}
            name="pt50"
            isChecked={pt50}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="ptPrice"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'60만원'}
            name="pt60"
            isChecked={pt60}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="ptPrice"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'70만원'}
            name="pt70"
            isChecked={pt70}
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
