import { AppSpinner } from '@/components';

function Fallback() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 items-center justify-center">
      <AppSpinner />
      <p className="text-sm text-indigo-700">페이지를 불러오고 있습니다.</p>
    </div>
  );
}

export default Fallback;
