import { configureStore } from '@reduxjs/toolkit'
import typeReducer from './slices/types'
import productReducer from './slices/products'
import authReducer from './slices/auth'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    type: typeReducer,
    product: productReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();