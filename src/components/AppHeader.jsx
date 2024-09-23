import { memo } from 'react';
import { node, string, bool } from 'prop-types';
import { useNavigate } from 'react-router-dom';

AppHeader.propTypes = {
  className: string,
  children: node,
  logo: bool,
  chat: bool,
  login: bool,
  navigation: bool,
};

function AppHeader({ className, children, logo, chat, login, navigation }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (chat) {
      navigate('/chat', { replace: true });
    } else if (login) {
      navigate('/', { replace: true });
    } else if (navigation) {
      navigate('/main', { replace: true });
    } else {
      navigate(-1, { replace: true });
    }
  };

  const isLogo = logo ? (
    <h1 className="text-f20 text-center text-mainColor font-bold">다있짐</h1>
  ) : (
    <>
      <button type="button" onClick={handleGoBack} aria-label="뒤로가기">
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
    <div className="fixed w-full py-[18px] bg-mainBg z-[5]">
      <header className={headerBaseClass}>{isLogo}</header>
    </div>
  );
}

export default memo(AppHeader);
