import {configureStore} from '@reduxjs/toolkit'
import burgerReducer from '../store/burgerSlice'
import { useDispatch,useSelector } from 'react-redux'
import {TypedUseSelectorHook} from 'react-redux'

const store =configureStore({
    reducer:{
      burger:burgerReducer
    }
  })

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector

export default store


