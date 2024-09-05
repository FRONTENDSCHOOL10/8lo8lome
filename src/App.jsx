import { useState, useEffect } from 'react';
import router from '@/router';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppLoading from './components/AppLoading';

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <HelmetProvider>
      {loading ? <AppLoading /> : <RouterProvider router={router} />}
    </HelmetProvider>
  );
}

export default App;
