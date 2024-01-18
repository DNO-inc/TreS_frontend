import { api } from "./api";

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
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/token/refresh",
        method: "POST",
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
  useRefreshTokenMutation,
  useDeleteTokenMutation,
} = authApi;
