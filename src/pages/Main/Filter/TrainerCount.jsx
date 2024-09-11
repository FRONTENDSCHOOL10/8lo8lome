import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { AppCheckboxInput } from '@/components';

function TrainerCount() {
  const { handleCheckboxChange, trainerCount } = mainStore((s) => ({
    handleCheckboxChange: s.handleMethod.handleCheckboxChange,
    trainerCount: s.searchFilter.trainerCount,
  }));

  const { oneToTwo, threeToFour, fiveToSix } = trainerCount;

  return (
    <fieldset className="pl-[1.9375rem] pr-[1.9375rem]">
      <legend className="text-f16 py-4 px-s10 border-b-2 border-solid border-strokeBlack w-full">
        트레이너 수
      </legend>
      <ul className="flex gap-4 flex-wrap pt-4 justify-center">
        <li>
          <AppCheckboxInput
            label={'1~2명'}
            name="oneToTwo"
            isChecked={oneToTwo}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="trainerCount"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'3~4명'}
            name="threeToFour"
            isChecked={threeToFour}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="trainerCount"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'5~6명'}
            name="fiveToSix"
            isChecked={fiveToSix}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="trainerCount"
          />
        </li>
      </ul>
    </fieldset>
  );
}

export default memo(TrainerCount);
