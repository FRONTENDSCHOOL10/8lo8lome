import { memo } from 'react';
import { useMainStore } from '@/stores/mainStore';
import { AppCheckboxInput } from '@/components';

function Rating() {
  const { handleCheckboxChange, rating } = useMainStore((s) => ({
    handleCheckboxChange: s.handleMethod.handleCheckboxChange,
    rating: s.searchFilter.rating,
  }));

  const { star1, star2, star3, star4, star5 } = rating;

  return (
    <section>
      <fieldset>
        <legend>별점순</legend>
        <ul className="mt-s12 flex flex-col gap-1">
          <li>
            <AppCheckboxInput
              label={'⭐'}
              name="star1"
              isChecked={star1}
              onChange={handleCheckboxChange}
              required
              className="p-3 border-2 border-solid border-grayBoder rounded-3xl inline-block"
            />
          </li>
          <li>
            <AppCheckboxInput
              label={'⭐⭐'}
              name="star2"
              isChecked={star2}
              onChange={handleCheckboxChange}
              required
            />
          </li>
          <li>
            <AppCheckboxInput
              label={'⭐⭐⭐'}
              name="star3"
              isChecked={star3}
              onChange={handleCheckboxChange}
              required
            />
          </li>
          <li>
            <AppCheckboxInput
              label={'⭐⭐⭐⭐'}
              name="star4"
              isChecked={star4}
              onChange={handleCheckboxChange}
              required
            />
          </li>
          <li>
            <AppCheckboxInput
              label={'⭐⭐⭐⭐⭐'}
              name="star5"
              isChecked={star5}
              onChange={handleCheckboxChange}
              required
            />
          </li>
        </ul>
      </fieldset>
    </section>
  );
}

export default memo(Rating);
