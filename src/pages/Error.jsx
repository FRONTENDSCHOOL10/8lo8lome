// import { AppFooter, AppHeader, AppNav } from '@/components';
// import { useRouteError } from 'react-router-dom';

// function ErrorPage() {
//   const { status, statusText, data } = useRouteError();

//   return (
//     <div className="ErrorLayout h-screen bg-indigo-50 flex flex-col">
//       <AppHeader />
//       <AppNav />
//       <main className="flex-1 flex flex-col items-center justify-center gap-2 m-4">
//         <h1 className="font-medium text-3xl text-indigo-600">
//           <q>
//             {status} {statusText}
//           </q>{' '}
//           오류 발생<span className="italic">!</span>
//         </h1>
//         <div className="flex flex-col items-center gap-3">
//           <p className="text-indigo-800 text-lg">
//             오류 발생 요인은 다음과 같습니다.
//           </p>
//           <code className="text-sm text-indigo-600 bg-white py-2 px-4 rounded-full border-2 border-indigo-400/40">
//             {data}
//           </code>
//         </div>
//       </main>
//       <AppFooter />
//     </div>
//   );
// }

// export default ErrorPage;
