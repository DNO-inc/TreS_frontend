import { api } from "../api";

export const profileApi = api.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query({
      query: ({ userId }) => ({
        url: `/profile/${userId || ""}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }),
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
