import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false,
    user: null,
    token: null

}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.user = null
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer