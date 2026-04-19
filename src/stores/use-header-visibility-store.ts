import { create } from "zustand";

interface HeaderVisibilityStore {
  hideHeader: boolean;
  setHideHeader: (value: boolean) => void;
}

export const useHeaderVisibilityStore = create<HeaderVisibilityStore>(
  (set) => ({
    hideHeader: false,
    setHideHeader: (value) => set({ hideHeader: value }),
  })
);
