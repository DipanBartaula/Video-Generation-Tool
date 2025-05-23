import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const userAPI = createApi({
    reducerPath: "productsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api"
    }),
    endpoints(builder) {
        return {
            registerUser: builder.mutation({
                query: (formdata) => {
                    return {
                        url: '/register',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: formdata
                    }
                }
            }),
            getUser: builder.query({
                query: (token) => {
                    return {
                        url: '/user',
                        method: "GET",
                        headers: {
                            'auth-token': token
                        }
                    }
                }
            }),


            // Get all videos of a user by their ID
            getVideosByUserId: builder.query({
                query: (userId) => {
                    return {
                        url: `videos/${userId}`, // Adjust this path as needed
                        method: "GET",
                    }
                }
            }),

            // Add a video to a user
            addVideoToUser: builder.mutation({
                query: (data) => {
                    return {
                        url: `addVideo`, // Adjust this path as needed
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: data
                    }
                }
            }),
            //getuser by email

            getUserByEmailId: builder.query({
                query: (email) => {
                    console.log("email", email);
                    return {
                        url: `byemail/${email}`, // Adjust this path as needed
                        method: "GET",
                    }
                }
            }),

            uploadownModelVideo: builder.mutation({
                query: (data) => {
                    return {
                        url: `uploadvideofromownmodel`,
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: data
                    }
                }
            }),

            getOwnModelVideos: builder.query({
                query: (userId) => {
                    return {
                        url: `ownvideos/${userId}`,
                        method: "GET",
                    }
                }
            })


        }
    },
})

export const {
    useRegisterUserMutation,
    useGetUserQuery,
    useGetVideosByUserIdQuery,
    useAddVideoToUserMutation,
    useGetUserByEmailIdQuery,
    useUploadownModelVideoMutation,
    useGetOwnModelVideosQuery

} = userAPI;

export { userAPI };
