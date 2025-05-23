import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isOpen:true


}


const sideBarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const { toggleSidebar } = sideBarSlice.actions
export default sideBarSlice.reducer