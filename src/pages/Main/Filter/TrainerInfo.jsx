import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';
import { AppCheckboxInput } from '@/components';

function TrainerInfo() {
  const { handleCheckboxChange, trainerInfo } = mainStore((s) => ({
    handleCheckboxChange: s.handleMethod.handleCheckboxChange,
    trainerInfo: s.searchFilter.trainerInfo,
  }));

  const { healthManager, sportInstructor, sportUniGraduate, bodybuilder } =
    trainerInfo;

  return (
    <fieldset className="pl-[1.9375rem] pr-[1.9375rem]">
      <legend className="text-f16 py-4 px-s10 border-b-2 border-solid border-strokeBlack w-full">
        트레이너 정보
      </legend>
      <ul className="flex gap-4 flex-wrap pt-4 justify-center">
        <li>
          <AppCheckboxInput
            label={'건강 운동관리사'}
            name="healthManager"
            isChecked={healthManager}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="trainerInfo"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'생활 체육 지도사'}
            name="sportInstructor"
            isChecked={sportInstructor}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="trainerInfo"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'체육 대학 출신'}
            name="sportUniGraduate"
            isChecked={sportUniGraduate}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="trainerInfo"
          />
        </li>
        <li>
          <AppCheckboxInput
            label={'보디빌더 출전'}
            name="bodybuilder"
            isChecked={bodybuilder}
            onChange={handleCheckboxChange}
            isFilterClass
            filterName="trainerInfo"
          />
        </li>
      </ul>
    </fieldset>
  );
}

export default memo(TrainerInfo);
