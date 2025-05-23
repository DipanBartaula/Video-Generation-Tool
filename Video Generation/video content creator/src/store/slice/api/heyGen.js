import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const heyGenAPI = createApi({
    reducerPath: 'heyGenAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.heygen.com/v2'
    }),
    endpoints(builder) {

        return {
            generateVideo: builder.mutation({
                query: (payload) => {
                    console.log(payload);
                    return {
                        url: '/video/generate',
                        method: 'POST',
                        headers: {
                            'X-Api-Key': payload.apiKey,
                            'Content-Type': 'application/json',
                        },
                        body: {
                            video_inputs: [{
                                character: {
                                    type: 'avatar',
                                    avatar_id: payload.avatarId,
                                    avatar_style: 'normal',
                                },
                                voice: {
                                    type: 'text',
                                    input_text: payload.inputText,
                                    voice_id: payload.voiceId,
                                    speed: 1.1,
                                },
                            }],
                            dimension: {
                                width: 1280,
                                height: 720,
                            }
                        }
                    }
                }
            })
        }
    }
})

export const { useGenerateVideoMutation } = heyGenAPI;
export { heyGenAPI };
