import { api } from "../api";

export const adminApi = api.injectEndpoints({
  endpoints: builder => ({
    getAdminTickets: builder.mutation({
      query: ({ body }) => ({
        url: `/admin/tickets/ticket_list`,
        method: "POST",
        body,
      }),
    }),
    adminShowTicket: builder.mutation({
      query: ({ body }) => ({
        url: "admin/tickets/show",
        method: "POST",
        body,
      }),
    }),
    adminUpdateTicket: builder.mutation({
      query: ({ body }) => ({
        url: "/admin/tickets/update",
        method: "POST",
        body,
      }),
    }),
    adminRemoveTicket: builder.mutation({
      query: ({ body }) => ({
        url: "/admin/tickets/delete",
        method: "DELETE",
        body,
      }),
    }),
    adminUpdateProfile: builder.mutation({
      query: ({ body }) => ({
        url: "/admin/profile/update",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAdminTicketsMutation,
  useAdminShowTicketMutation,
  useAdminUpdateTicketMutation,
  useAdminRemoveTicketMutation,
  useAdminUpdateProfileMutation,
} = adminApi;
