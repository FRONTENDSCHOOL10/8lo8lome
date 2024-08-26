// import { AppDivider, AppLink } from '@/components';
// import Counter from '@/miniApp/Counter';
// import TaskManager from '@/miniApp/TaskManager/TaskManager';
// import { Helmet } from 'react-helmet-async';

// function HomePage() {
//   return (
//     <>
//       <Helmet>
//         <title>앱 글로벌 상태 관리 with Zustand</title>
//         <meta
//           name="description"
//           content="Zustand를 사용하면 Context, useReducer, useState 없이 보다 효과적으로, 더 빠르게, 더 가볍게 상태를 관리할 수 있습니다."
//         />
//         <meta property="og:title" content="이듬(E.UID) 블렌디드 러닝" />
//         <meta property="twitter:title" content="이듬(E.UID) 블렌디드 러닝" />
//         <meta property="og:type" content="site" />
//         <meta property="og:url" content="https://yamoo9.github.io/EUID" />
//         <meta
//           property="og:description"
//           content="Front-End 개발자를 꿈꾸는 이들을 위한 블렌디드 러닝으로 개발에 필요한 모든 것!"
//         />
//         <meta
//           property="og:image"
//           content="https://yamoo9.github.io/EUID/og-image.jpg"
//         />
//         <meta property="og:site:author" content="야무(yamoo9)" />
//       </Helmet>
//       <section id="page">
//         <div className="learn">
//           <h1>앱 글로벌 상태 관리 with Zustand</h1>

//           <p>
//             <AppLink
//               href="https://zustand.docs.pmnd.rs/getting-started/introduction"
//               isExternal
//             >
//               Zustand
//             </AppLink>{' '}
//             라이브러리를 사용해 앱 또는 컴포넌트의 상태를 효과적으로 관리하는
//             방법을 학습합니다.
//           </p>

//           <AppDivider />

//           <h2 lang="en" className="uppercase">
//             Counter
//           </h2>

//           <p>간단한 카운터 앱의 상태를 Zustand를 사용해 관리합니다.</p>

//           <Counter />

//           <AppDivider />

//           <h2 lang="en" className="uppercase">
//             Task Manager
//           </h2>

//           <p>
//             태스크 매니저 앱의 상태를 컨텍스트 + 리듀서 대신, Zustand를
//             사용하도록 변경해봅니다.
//           </p>

//           <TaskManager />
//         </div>
//       </section>
//     </>
//   );
// }

// export default HomePage;
