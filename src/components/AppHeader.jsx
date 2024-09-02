import { memo } from 'react';
import { node, string } from 'prop-types';
import { useNavigate } from 'react-router-dom';

AppHeader.propTypes = {
  className: string,
  children: node.isRequired,
};

function AppHeader({ className, children }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  let headerBaseClass = `flex p-6 bg-subBg font-bold text-[20px] w-full mt-10 ${className}`;

  return (
    <header className={headerBaseClass}>
      <button type="button" onClick={handleGoBack}>
        {'<'}
      </button>
      <h1 className="text-white mx-auto">{children}</h1>
    </header>
  );
}

export default memo(AppHeader);
