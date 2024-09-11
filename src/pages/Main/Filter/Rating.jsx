import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { AppCheckboxInput } from '@/components';

function Rating() {
  const { handleCheckboxChange, rating } = mainStore((s) => ({
    handleCheckboxChange: s.handleMethod.handleCheckboxChange,
    rating: s.searchFilter.rating,
  }));

  const { star1, star2, star3, star4, star5 } = rating;

  return (
    <fieldset className="pl-[1.9375rem] pr-[1.9375rem] mt-[100px]">
      <legend className="text-f16 py-4 px-s10 border-b-2 border-solid border-strokeBlack w-full">
        별점순
      </legend>
      <ul className="flex gap-4 flex-wrap pt-4 justify-center">
        <li>
          <AppCheckboxInput
            label={'⭐'}
            name="star1"
            isChecked={star1}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="rating"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'⭐⭐'}
            name="star2"
            isChecked={star2}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="rating"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'⭐⭐⭐'}
            name="star3"
            isChecked={star3}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="rating"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'⭐⭐⭐⭐'}
            name="star4"
            isChecked={star4}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="rating"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'⭐⭐⭐⭐⭐'}
            name="star5"
            isChecked={star5}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="rating"
          />
        </li>
      </ul>
    </fieldset>
  );
}

export default memo(Rating);
