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
        url: "tickets/show",
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
  }),
});

export const {
  useGetAdminTicketsMutation,
  useAdminShowTicketMutation,
  useAdminUpdateTicketMutation,
} = adminApi;
