import { api } from "../api";

export const profileApi = api.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.mutation({
      query: ({ userId }) => ({
        url: `/profile/${userId || ""}`,
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ body }) => ({
        url: "/profile/update",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetProfileMutation, useUpdateProfileMutation } = profileApi;
