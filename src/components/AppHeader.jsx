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

  let headerBaseClass = `flex p-s22 bg-subBg font-bold text-f20 w-full my-s40 ${className}`;

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
