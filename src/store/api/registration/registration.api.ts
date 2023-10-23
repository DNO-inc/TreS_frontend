import { api } from "../api";

export const registrationApi = api.injectEndpoints({
  endpoints: builder => ({
    registration: builder.mutation({
      query: ({ body }) => ({
        url: "/registration/",
        method: "POST",
        body,
      }),
    }),
    emailVerification: builder.mutation({
      query: ({ body }) => ({
        url: "/registration/verify_email",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegistrationMutation, useEmailVerificationMutation } =
  registrationApi;
