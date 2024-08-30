import { memo } from 'react';
import { node } from 'prop-types';

AppForm.propTypes = {
  children: node.isRequired,
};

function AppForm({ children, ...restProps }) {
  return (
    <form
      className="flex flex-col items-start w-80 gap-5 border-accent pt-3 pb-5 px-6 rounded-xl border-4 border-double"
      {...restProps}
    >
      {children}
    </form>
  );
}

export default memo(AppForm);
