import router from '@/router';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// 캐싱 관리 객체
// eslint-disable-next-line react-refresh/only-export-components
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 쿼리의 기본 옵션 설정 (예: 자동 리페치, 캐시 유지 시간 등)
      staleTime: 1000 * 60 * 5, // 5분 동안 데이터가 신선하다고 간주
      cacheTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation failed:', error);
      },
    },
  },
});

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
