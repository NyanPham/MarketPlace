// src/store/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  minPrice: number
  maxPrice: number
  searchValue: string
  selectedTier: string | number
  selectedTheme: string | number
  sortedTime: string | number
  sortedPrice: string | number
  searchTrigger: boolean
}

const initialState: FilterState = {
  minPrice: 0,
  maxPrice: 100,
  searchValue: '',
  selectedTier: 0,
  selectedTheme: 0,
  sortedTime: 'ascending',
  sortedPrice: 'ascending',
  searchTrigger: true,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleSearchTrigger: (state, action: PayloadAction<boolean>) => {
      state.searchTrigger = action.payload
    },
    setminPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload
    },
    setmaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setSelectedTier: (state, action: PayloadAction<number>) => {
      state.selectedTier = action.payload
    },
    setSelectedTheme: (state, action: PayloadAction<number>) => {
      state.selectedTheme = action.payload
    },
    setsortedTime: (state, action: PayloadAction<string | number>) => {
      state.sortedTime = action.payload
    },
    setsortedPrice: (state, action: PayloadAction<string | number>) => {
      state.sortedPrice = action.payload
    },
    resetFilter: (state) => {
      Object.assign(state, initialState)
    },
  },
})

export const { setminPrice, setmaxPrice, setSearchValue, setSelectedTier, setSelectedTheme, setsortedTime, setsortedPrice, resetFilter, toggleSearchTrigger } = filterSlice.actions

export default filterSlice.reducer
