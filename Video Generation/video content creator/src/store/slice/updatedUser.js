
import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isUserUpdated: false,
    updatedUser: null
}

const updatedUserSlice = createSlice({
    name: "updatedUser",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.isUserUpdated = true
            state.updatedUser = action.payload
        },
        clearUpdateUser: (state) => {
            state.isUserUpdated = false
            state.updatedUser = null
        },
        isUserUpdated: (state) => {
            state.isUserUpdated = true
        }
    }
})


export const { updateUser, clearUpdateUser, isUserUpdated } = updatedUserSlice.actions

export default updatedUserSlice.reducer