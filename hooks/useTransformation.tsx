import { create } from "zustand";
type CurrTransformation = Omit<ITransformation, "width" | "height" | "userIds">;
type Transformation = {
  current: CurrTransformation | null;
  setCurrent: (transformation: CurrTransformation) => void;
};
const transformationStore = create<Transformation>((set) => ({
  current: null,
  setCurrent: (transformation) => set({ current: transformation }),
}));
export const useTransformation = transformationStore;
