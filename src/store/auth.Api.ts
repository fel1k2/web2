import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/auth/' }),
    endpoints: (builder) => ({
        signup: builder.mutation<{ message: string }, {
            username: string,
            nickname: string,
            email: string,
            password: string
        }>({
            query: (userData) => ({
                url: "/signup", method: "POST", body: userData
            }),
        }),
        signin: builder.mutation<{ message: string }, {
            email: string,
            password: string
        }>({
            query: (userData) => ({
                url: "/signin", method: "POST", body: userData
            }),
        }),
    }),

})

export const { useSignupMutation, useSigninMutation } = authApi