
import { create } from "zustand";

interface movementState {
    reloadIncome: number
    reloadExpense: number
    refreshIncome: () => void
    refreshExpense: () => void
}

export const usMovementStore = create<movementState>((set) => ({
    reloadIncome: 0,
    reloadExpense: 0,

    refreshIncome: () => {
        set((state) => ({reloadIncome: state.reloadIncome + 1}))
    },

    refreshExpense: () => {
        set((state) => ({reloadExpense: state.reloadExpense + 1}))
    } 
}))