// import { create } from 'zustand';

// export const useSearchStore = create((set) => ({
//   inputValue: '',
//   setInputValue: (value) => set({ inputValue: value }),

//   searchWord: '',
//   setSearchWord: (value) => set({ searchWord: value }),

//   gymsList: [],
//   setGymsList: (value) => set({ gymsList: value }),

//   filterGyms: [],
//   setFilterGyms: (value) => set({ filterGyms: value }),
// ));

//   // 성별 선택 핸들러
//   const handleGenderCheck = ({ value }) => {
//     set(
//       produce((draft) => {
//         // 선택된 성별 값을 상태에 저장합니다.
//         draft.user.gender = value;
//       })
//     );
//   };

//   // 나이 선택 핸들러
//   const handleAgeCheck = ({ value }) => {
//     set(
//       produce((draft) => {
//         // 선택된 나이 값을 상태에 저장합니다.
//         draft.user.age = value;
//       })
//     );
//   };
