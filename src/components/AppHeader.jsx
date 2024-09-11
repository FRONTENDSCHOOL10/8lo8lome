import { memo } from 'react';
import { node, string, bool } from 'prop-types';
import { useNavigate } from 'react-router-dom';

AppHeader.propTypes = {
  className: string,
  children: node,
  logo: bool,
  chat: bool,
};

function AppHeader({ className, children, logo, chat }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    chat
      ? navigate('/chat', { replace: true })
      : navigate(-1, { replace: true });
  };

  const isLogo = logo ? (
    <h1 className="text-f20 text-center text-mainColor font-bold">다있짐</h1>
  ) : (
    <>
      <button type="button" onClick={handleGoBack}>
        <svg
          className={`w-5 h-5`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <use href={`../assets/sprite.svg#arrow-back`} />
        </svg>
      </button>
      <h1 className="text-white mx-auto">{children}</h1>
    </>
  );
  let headerBaseClass = `flex p-s22 bg-subBg font-bold text-f20  `;

  if (className) {
    headerBaseClass = `flex p-s22 bg-subBg font-bold text-f20 ${className}`;
  }

  return (
    <div className="fixed w-[338px] py-[18px] bg-mainBg z-[1]">
      <header className={headerBaseClass}>{isLogo}</header>
    </div>
  );
}

export default memo(AppHeader);
