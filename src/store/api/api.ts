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
    getGroups: builder.query({
      query: () => "/meta/get_groups",
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
    getQueueByFaculty: builder.mutation({
      query: ({ body }) => ({
        url: "/meta/get_queues",
        method: "POST",
        body,
      }),
    }),
    registration: builder.mutation({
      query: ({ body }) => ({
        url: "/registration/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetVersionQuery,
  useGetUpdatesQuery,
  useGetAdminsMutation,
  useGetFacultiesQuery,
  useGetGroupsQuery,
  useGetStatusesQuery,
  useGetQueueByFacultyMutation,
  useRegistrationMutation,
} = api;
