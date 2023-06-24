import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endpoints } from "../../constants";

export const api = createApi({
  reducerPath: "api",
  // tagTypes: ["Like", "Bookmark"],
  baseQuery: fetchBaseQuery({ baseUrl: endpoints.baseUrl }),
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
    // signup: builder.mutation({
    //   query: ({ body }) => ({
    //     url: "/registration/",
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body,
    //   }),
    // }),
    login: builder.mutation({
      query: ({ body }) => ({
        url: "/auth/password/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
    getQueueByFaculty: builder.mutation({
      query: ({ body }) => ({
        url: "/meta/get_queues",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        body,
      }),
    }),
  }),
});

export const {
  useGetVersionQuery,
  useGetUpdatesQuery,
  useLoginMutation,
  useGetFacultiesQuery,
  useGetQueueByFacultyMutation,
} = api;
