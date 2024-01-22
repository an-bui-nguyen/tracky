import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const userSlice = createSlice({
  name: 'authentication',
  initialState: null,
  reducers: {
    setToken(state, action) {
      return action.payload
    }
  }
})

export default userSlice.reducer
export const { setUser } = userSlice.actions

export const setAxiosHeaderToken = (token) => {
  return async (dispatch) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}
