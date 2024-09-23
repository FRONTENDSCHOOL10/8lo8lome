import { AppImageDisplay } from '@/components';
import { memo } from 'react';
import { object } from 'prop-types';

AppTrainerProfile.propTypes = {
  trainerData: object,
};

function AppTrainerProfile({ trainerData }) {
  return (
    <section className="mt-[100px]">
      <AppImageDisplay
        item={trainerData}
        className="ml-s31"
        imgHeight="h-s170"
      />

      <div className="mx-s31 py-s16 border-b border-solid border-strokeBlack flex flex-col gap-s10">
        <h2 className="text-f18 font-bold text-center">{trainerData.name}</h2>
        <div className="flex items-center justify-between gap-1">
          <svg
            aria-label="이전 트레이너 정보로 넘기는 버튼"
            className="w-s22 h-s22 fill-white pr-2"
          >
            <use href="/assets/sprite.svg#arrow-back" />
          </svg>
          <p className="text-f14 font-medium leading-normal">
            {trainerData.aboutMe}
          </p>
          <svg
            aria-label="다음 트레이너 정보로 넘기는 버튼"
            className="w-s22 h-s22 fill-white pl-2"
          >
            <use href="/assets/sprite.svg#arrow-forward" />
          </svg>
        </div>
      </div>

      <ul className="mx-s31 px-[0.6875rem] py-s16 border-b border-solid border-strokeBlack flex flex-col gap-[1.0625rem]">
        <li>
          <p className="text-f14 font-semibold pb-[0.5625rem]">경력</p>

          {trainerData.careerHistory ? (
            <ul className="flex flex-col gap-s8 text-f12 font-normal">
              {trainerData.careerHistory.map((history, index) => {
                return <li key={index}>{history}</li>;
              })}
            </ul>
          ) : (
            ''
          )}
        </li>
        <li>
          <p className="text-f14 font-semibold pb-[0.5625rem]">자격&수상</p>

          {trainerData.achievements ? (
            <ul className="flex flex-col gap-s8 text-f12 font-normal">
              {trainerData.achievements.map((achievement, index) => {
                return <li key={index}>{achievement}</li>;
              })}
            </ul>
          ) : (
            ''
          )}
        </li>
      </ul>
    </section>
  );
}

export default memo(AppTrainerProfile);
