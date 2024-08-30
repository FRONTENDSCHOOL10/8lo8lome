import { memo } from 'react';

function AppDivider() {
  return (
    <hr className="my-8 border-t-[0.5px] border-solid border-t-accent w-1/4 max-w-md" />
  );
}

export default memo(AppDivider);
