import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware'

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const data = (await AsyncStorage.getItem(name)) || null

    return data
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    await AsyncStorage.removeItem(name)
  },
}

export type Calculation = {
  id: string
  name: string
  genre?: string
  bodyMass: number
  height?: number
  age?: number
  TMR: number
  NAF: number
  createdAt: string
  levelOfActivity: string
  condition: string
}

interface AppState {
  history: Calculation[]
  addToHistory: (calculationValues: Calculation) => void
  removeHistory: (id: string) => void
  clearHistory: () => void
  isCalculating: boolean
  setIsCalculating: (value: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      history: [],
      addToHistory: (calculationValues: Calculation) =>
        set((state) => ({ history: [...state.history, calculationValues] })),
      removeHistory: (id: string) =>
        set((state) => ({ history: state.history.filter((item) => item.id !== id) })),
      clearHistory: () => set((state) => ({ history: [] })),
      isCalculating: false,
      setIsCalculating: () => set((state) => ({ isCalculating: !state.isCalculating })),
    }),
    {
      name: 'tmr-storage',
      storage: createJSONStorage(() => storage),
    },
  ),
)
