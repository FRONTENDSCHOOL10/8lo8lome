import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { string } from 'prop-types';

AppMeta.propTypes = {
  title: string.isRequired,
  description: string.isRequired,
};

function AppMeta({ title, description }) {
  // <AppMeta title="메인페이지" description="회원가입 페이지입니다." />
  return (
    <Helmet>
      <title>다있짐 / {title}</title>
      <meta name="description" content={'다있짐 / ' + description} />
      <meta property="og:title" content={'다있짐 / ' + title} />
      <meta property="twitter:title" content={'다있짐 / ' + title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={'다있짐 / ' + description} />
      <meta property="og:image" content="/assets/logo.svg" />
      <meta name="twitter:image" content="/assets/logo.svg" />
    </Helmet>
  );
}

export default memo(AppMeta);
