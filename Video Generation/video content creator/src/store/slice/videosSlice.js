import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videos: [],
    ownVideos: []
}

const videosSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        setVideos: (state, action) => {
            state.videos = action.payload
        },
        setSingleVideo: (state, action) => {
            state.videos.push(action.payload)
        },
        setOwnAllVideos: (state, action) => {
            state.ownVideos = action.payload
        },
        setSingleOwnVideo: (state, action) => {
            state.ownVideos.push(action.payload)

        },
    }
});

export const { setVideos, setSingleVideo, setOwnAllVideos, setSingleOwnVideo } = videosSlice.actions

export default videosSlice.reducer;

