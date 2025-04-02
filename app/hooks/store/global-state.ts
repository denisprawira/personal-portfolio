import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const KeyIds = {
  PROJECT_MENU: "project-menu", //Menu[]
} as const;

type StorageKey = keyof typeof KeyIds;

interface IStorageState {
  [key: string]: unknown;
  setValue: <T>(key: string, value: T) => void;
}

const useGlobalStatePersistent = create<IStorageState>()(
  persist(
    (set) => ({
      setValue: (key, value) => set({ [key]: value }),
    }),
    {
      name: "glabal-state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

const useGlobalStateNonPersistent = create<IStorageState>((set) => ({
  setValue: (key, value) => set({ [key]: value }),
}));

export const useGlobalState = <T>(
  key: StorageKey,
  defaultValue?: T,
  persistent: boolean = true
): { value: T | undefined; setValue: (val: T) => void } => {
  const mappedKey = KeyIds[key] as string;
  const store = persistent
    ? useGlobalStatePersistent
    : useGlobalStateNonPersistent;
  const storedValue = store((state) => state[mappedKey]) as T | undefined;
  const setValue = store((state) => state.setValue);
  if (storedValue === undefined && defaultValue !== undefined) {
    setValue(mappedKey, defaultValue);
  }
  return {
    value: storedValue ?? defaultValue,
    setValue: (val: T) => setValue(mappedKey, val),
  };
};
