import { memo } from 'react';

function AppDivider() {
  return (
    <hr className="my-1 border-t-[1px] border-solid border-t-accent max-w-md" />
  );
}

export default memo(AppDivider);
