import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  tenant: {},
  admin: {}, 
  current: 0 }

const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => { }
})

export default AppSlice.reducer

export const selectCurrentAppState = (state: any) => state.app
export const tenant = (state: any) => state.app.tenant
export const admin = (state: any) => state.app.admin
export const steps = (state: any) => state.app.current

