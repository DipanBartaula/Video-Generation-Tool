import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    TTS_URL: "",
    CLIP_GENERATION_URL: "",
    REFERENCE_VIDEO_URL: "",
    REFERNE_AUDIO_URL: "",
    THUMBNAIL_URL: "",
}


const selfModelSlice = createSlice({
    name: "selfmodel",
    initialState,
    reducers: {
        setTTS_URL: (state, action) => {
            state.TTS_URL = action.payload
        },
        setCLIP_GENERATION_URL: (state, action) => {
            state.CLIP_GENERATION_URL = action.payload
        },
        setREFERENCE_VIDEO_URL: (state, action) => {
            state.REFERENCE_VIDEO_URL = action.payload
        },
        setREFERNE_AUDIO_URL: (state, action) => {
            state.REFERNE_AUDIO_URL = action.payload
        },
        setTHUMBNAIL_URL: (state, action) => {
            state.THUMBNAIL_URL = action.payload
        },

    }
})

export const { setTTS_URL, setCLIP_GENERATION_URL, setREFERENCE_VIDEO_URL, setREFERNE_AUDIO_URL, setTHUMBNAIL_URL } = selfModelSlice.actions
export default selfModelSlice.reducer

