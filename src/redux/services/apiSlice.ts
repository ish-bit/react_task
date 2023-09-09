import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



const baseURL = "http://localhost:8000/"
const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    // credentials: 'include',
    prepareHeaders: (headers, { getState }:any) => {
        // const token = getState().auth.token
        // if (token) {
        //     headers.set("authorization", `Bearer ${token}`)
        // }
        return headers
    }
})

const baseQueryWithReauth = async (args:any, api:any, extraOptions:any) => {
    let result:any = await baseQuery(args, api, extraOptions)

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
    refetchOnMountOrArgChange: true,
    keepUnusedDataFor: 1
})