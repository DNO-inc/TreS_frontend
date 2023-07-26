import { api } from "../api";

export const adminApi = api.injectEndpoints({
  endpoints: builder => ({
    getAdminTickets: builder.mutation({
      query: ({ body }) => ({
        url: `/admin/tickets/ticket_list`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body,
      }),
    }),
  }),
});

export const { useGetAdminTicketsMutation } = adminApi;
