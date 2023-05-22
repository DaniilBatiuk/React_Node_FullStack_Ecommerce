import { configureStore } from '@reduxjs/toolkit'
import typeReducer from './slices/types'
import productReducer from './slices/products'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    type: typeReducer,
    product: productReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();