import { configureStore } from '@reduxjs/toolkit'
import typeReducer from './slices/types'

export const store = configureStore({
  reducer: {
    type: typeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch