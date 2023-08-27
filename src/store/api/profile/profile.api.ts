import { api } from "../api";

export const profileApi = api.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.mutation({
      query: ({ userId }) => ({
        url: `/profile/${userId || ""}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProfileMutation } = profileApi;
