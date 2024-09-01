import { memo } from 'react';
import { node } from 'prop-types';
import { useNavigate } from 'react-router-dom';

AppHeader.propTypes = {
  children: node.isRequired,
};

function AppHeader({ children }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <header className="flex p-6 bg-subBg font-bold text-[20px]  w-full ">
      <button type="button" onClick={handleGoBack}>
        {'<'}
      </button>
      <h1 className="text-white mx-auto">{children}</h1>
    </header>
  );
}

export default memo(AppHeader);
