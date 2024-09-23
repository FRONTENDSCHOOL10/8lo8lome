import { memo } from 'react';

function AppReviewMenuModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <ul className="bg-white p-4 rounded shadow-lg">
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
    </div>
  );
}

export default memo(AppReviewMenuModal);
