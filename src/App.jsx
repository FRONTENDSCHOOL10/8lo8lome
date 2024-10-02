import router from '@/router';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// 캐싱 관리 객체
// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

globalThis.addEventListener('vite:preloadError', () => {
  location.reload();
});

export default App;
