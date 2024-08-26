import { redirect } from 'react-router-dom';

const auth = {
  user: null,
};

export const protectedLoader = async ({ request }) => {
  if (!auth.user) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/login?' + params.toString());
  }
  return null;
};
