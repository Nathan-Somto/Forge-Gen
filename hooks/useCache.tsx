import { create } from "zustand";

type CacheStore = {
  cache: { [key: string]: any };  
  setCache: (key: string, value: any) => void; 
  getCache: (key: string) => any;              
  removeCache: (key: string) => void;          
  clearCache: () => void;                      
};

export const useCache = create<CacheStore>((set, get) => ({
  cache: {},

  setCache: (key, value) => 
    set((state) => ({
      cache: {
        ...state.cache,
        [key]: value,
      },
    })),

  getCache: (key) => get().cache[key],

  removeCache: (key) => 
    set((state) => {
      const newCache = { ...state.cache };
      delete newCache[key];
      return { cache: newCache };
    }),

  clearCache: () => set({ cache: {} }),
}));
