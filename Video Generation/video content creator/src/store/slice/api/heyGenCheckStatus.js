import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const heyGenAPIStatus = createApi({
    reducerPath: 'heyGenAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.heygen.com/v1'
    }),
    endpoints(builder) {

        return {

            checkVideoStatus: builder.query({
                query: ({ videoId, apiKey }) => {
                    return {
                        url: `/video_status.get?video_id=${videoId}`,
                        method: 'GET',
                        headers: {
                            'X-Api-Key': apiKey,
                        }
                    }
                }
            })
        }
    }
})

export const { useCheckVideoStatusQuery } = heyGenAPIStatus;
export { heyGenAPIStatus };
