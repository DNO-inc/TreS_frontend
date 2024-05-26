import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from './useBaseQuery'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getVersion: builder.query({
      query: () => '/about/version',
    }),
  }),
})

export const { useGetVersionQuery } = api
