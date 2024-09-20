import { node } from 'prop-types';
import { string, bool, func } from 'prop-types';
import { memo } from 'react';

AppAccordion.propTypes = {
  title: string.isRequired,
  isOpen: bool.isRequired,
  toggleAccordion: func.isRequired,
  children: node.isRequired,
};

function AppAccordion({ title, isOpen, toggleAccordion, children }) {
  return (
    <>
      <div
        onClick={toggleAccordion} // 아코디언 클릭 시 열기/닫기
        className="w-full flex justify-between py-[1.25rem] border-b border-solid border-strokeBlack mb-[20px]"
      >
        <h2 className="text-white">{title}</h2>
        <svg
          className={`w-5 h-5`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <use
            href={`../assets/sprite.svg#${isOpen ? 'arrow-up' : 'arrow-down'}`}
          />
        </svg>
      </div>
      {isOpen && <div>{children}</div>}
    </>
  );
}

export default memo(AppAccordion);
