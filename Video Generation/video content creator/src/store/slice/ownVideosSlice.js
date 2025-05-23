import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    ownVideos: {
        video_url: "https://res.cloudinary.com/de1yfnzdz/video/upload/v1733316924/web%20projects/lx1bph3qdktbnjt27ale.mp4",
        description: "Explore the life and groundbreaking theories of Albert Einstein, from relativity to E=mc², and his impact on our understanding of the cosmos.",
        title: "Albert Einstein: The Genius Who Changed Our Universe",
        _id: "680a1a8e1dc078020a5c7c8b"
    }
}


//intial state is 
// "newvideoData": {
//             "video_url": "https://res.cloudinary.com/de1yfnzdz/video/upload/v1733316924/web%20projects/lx1bph3qdktbnjt27ale.mp4",
//             "description": "Explore the life and groundbreaking theories of Albert Einstein, from relativity to E=mc², and his impact on our understanding of the cosmos.",
//             "title": "Albert Einstein: The Genius Who Changed Our Universe",
//             "_id": "680a1a8e1dc078020a5c7c8b"
//         }

const ownVideosSlice = createSlice({

    name: "ownVideos",
    initialState,

    reducers: {

        setOwnVideos: (state, action) => {
            state.ownVideos = action.payload
        }
    },
});


export const { setOwnVideos } = ownVideosSlice.actions

export default ownVideosSlice.reducer;