import { api } from "../api";

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: ({ body }) => ({
        url: "/auth/password/login",
        method: "POST",
        body,
      }),
    }),
    cabinetLogin: builder.mutation({
      query: ({ body }) => ({
        url: "/auth/key/login",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: email => ({
        url: `/profile/access_renew?email=${email}`,
        method: "GET",
      }),
    }),
    deleteToken: builder.mutation({
      query: () => ({
        url: "/auth/token/delete",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCabinetLoginMutation,
  useResetPasswordMutation,
  useDeleteTokenMutation,
} = authApi;
