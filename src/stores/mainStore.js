import { create } from 'zustand';

export const useSearchStore = create((set) => ({
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),

  searchWord: '',
  setSearchWord: (value) => set({ searchWord: value }),

  gymsList: [],
  setGymsList: (value) => set({ gymsList: value }),

  filterGyms: [],
  setFilterGyms: (value) => set({ filterGyms: value }),
}));
