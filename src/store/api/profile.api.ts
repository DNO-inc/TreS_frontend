import { api } from "./api";

export const profileApi = api.injectEndpoints({
  endpoints: builder => ({
    updateProfile: builder.mutation({
      query: ({ body }) => ({
        url: "/profile/update",
        method: "POST",
        body,
      }),
    }),
    sendEmailForAccess: builder.mutation({
      query: email => ({
        url: `/profile/access_renew?email=${email}`,
        method: "GET",
      }),
    }),
    accessRenew: builder.mutation({
      query: reset_token => ({
        url: `/profile/access_renew/${reset_token}`,
        method: "GET",
      }),
    }),
    getProfile: builder.mutation({
      query: ({ userId }) => ({
        url: `/profile/${userId || ""}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProfileMutation,
  useSendEmailForAccessMutation,
  useAccessRenewMutation,
  useUpdateProfileMutation,
} = profileApi;
