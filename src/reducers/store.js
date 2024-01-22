import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authReducer'


const store = configureStore({
  reducer: {
    authentication: authReducer
  }
})

export default store