import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const titleAndDesAPI = createApi({
    reducerPath: 'heyGenAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:7000/'
    }),
    endpoints(builder) {

        return {

            getVideoTitleAndDes: builder.mutation({
                query: (text) => {
                    return {
                        url: '/chat',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: {
                            text: `Can you give title and 30 word description of the given paragraph  ${text} `
                        }
                    }
                }
            })
        }
    }
})

export const { useGetVideoTitleAndDesMutation } = titleAndDesAPI;
export { titleAndDesAPI };
