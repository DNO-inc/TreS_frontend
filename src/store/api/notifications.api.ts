import { api } from "./api";

export const notificationsApi = api.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.mutation({
      query: () => ({
        url: "/notifications/offline",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNotificationsMutation } = notificationsApi;
