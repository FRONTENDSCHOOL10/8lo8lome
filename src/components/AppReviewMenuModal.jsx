import { memo } from 'react';

function AppReviewMenuModal({ onClose }) {
  return (
    <ul>
      <li>
        <button className="text-blue-500" onClick={onClose}>
          수정하기
        </button>
      </li>
      <li>
        <button className="text-red-500" onClick={onClose}>
          삭제하기
        </button>
      </li>
    </ul>
  );
}

export default memo(AppReviewMenuModal);
