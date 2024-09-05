import { memo } from 'react';
// import { useCounter } from '@/stores/counter';

function AppFooter() {
  // const { count, decrement } = useCounter(({ decrement, count }) => ({
  //   decrement,
  //   count,
  // }));

  // const currentYear = new Date().getFullYear();
  return (
    <footer className="flex items-center justify-center py-s20">
      <small lang="en" className="text-indigo-800">
        Copyright all Reserved. &copy;{' '}
        <button
          type="button"
          className="euid-button"
          // onClick={() => decrement()}
        >
          {/* {count} */}
        </button>
      </small>
    </footer>
  );
}

export default memo(AppFooter);
