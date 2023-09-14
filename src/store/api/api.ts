import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./useBaseQuery";

export const api = createApi({
  reducerPath: "api",
  // tagTypes: ["Like", "Bookmark"],
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getVersion: builder.query({
      query: () => "/about/version",
    }),
    getUpdates: builder.query({
      query: () => "/about/updates",
    }),
    getFaculties: builder.query({
      query: () => "/meta/get_faculties",
    }),
    getStatuses: builder.query({
      query: () => "/meta/get_statuses",
    }),
    getAdmins: builder.mutation({
      query: () => ({
        url: "/meta/get_admins",
        method: "POST",
      }),
    }),
    login: builder.mutation({
      query: ({ body }) => ({
        url: "/auth/password/login",
        method: "POST",
        body,
      }),
    }),
    getQueueByFaculty: builder.mutation({
      query: ({ body }) => ({
        url: "/meta/get_queues",
        method: "POST",
        body,
      }),
    }),
    deleteToken: builder.mutation({
      query: ({ body }) => ({
        url: "/auth/token/delete",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetVersionQuery,
  useGetUpdatesQuery,
  useLoginMutation,
  useGetAdminsMutation,
  useGetFacultiesQuery,
  useGetStatusesQuery,
  useGetQueueByFacultyMutation,
  useDeleteTokenMutation,
} = api;
