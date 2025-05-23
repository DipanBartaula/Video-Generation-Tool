import { configureStore } from "@reduxjs/toolkit";

import sideBarSlice from "./slice/sideBarSlice";
import userSlice from "./slice/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAPI } from "./slice/api/userApi";
import { heyGenAPI } from "./slice/api/heyGen";
import selfModelAPI from "./slice/selfmodel";
import updateUserSlice from "./slice/updatedUser";
import { heyGenAPIStatus } from "./slice/api/heyGenCheckStatus";
import videosSlice from "./slice/videosSlice";
import ownVideoSlice from "./slice/ownVideosSlice"
import { titleAndDesAPI } from "./slice/api/titleandDes";


const store = configureStore({
    reducer: {
        user: userSlice,
        sidebar: sideBarSlice,
        updatedUser: updateUserSlice,
        videos: videosSlice,
        selfModel: selfModelAPI,
        ownVideos: ownVideoSlice,
        [selfModelAPI.reducerPath]: selfModelAPI.reducer,


        [userAPI.reducerPath]: userAPI.reducer,
        [heyGenAPI.reducerPath]: heyGenAPI.reducer,
        [heyGenAPIStatus.reducerPath]: heyGenAPIStatus.reducer,
        [titleAndDesAPI.reducerPath]: titleAndDesAPI.reducer,



    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(userAPI.middleware, heyGenAPI.middleware, heyGenAPIStatus.middleware);
    },
})



setupListeners(store.dispatch);

export default store;