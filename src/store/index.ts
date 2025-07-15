import { configureStore } from '@reduxjs/toolkit'
import habitReducer from './reducers/habitSlice'
export const store = configureStore({
  reducer: {
    habits:habitReducer
  },
})

// Types for entire state & dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
