import { memo } from 'react';
import { node, string, bool } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

AppHeader.propTypes = {
  className: string,
  children: node.isRequired,
  logo: bool,
};

function AppHeader({ className, children, logo }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const isLogo = logo ? (
    <Link to={'/main'}>
      <svg
        className={`w-5 h-5 `}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <use href={`../assets/sprite.svg#my`} />
      </svg>
    </Link>
  ) : (
    <>
      <button type="button" onClick={handleGoBack}>
        <svg
          className={`w-5 h-5 `}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <use href={`../assets/sprite.svg#arrow-back`} />
        </svg>
      </button>
      <h1 className="text-white mx-auto">{children}</h1>
    </>
  );
  let headerBaseClass = `flex p-s22 bg-subBg font-bold text-f20 w-full my-s40 ${className}`;

  return <header className={headerBaseClass}>{isLogo}</header>;
}

export default memo(AppHeader);
