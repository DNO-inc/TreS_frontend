import { api } from "../api";

export const ticketsApi = api.injectEndpoints({
  endpoints: builder => ({
    getAnonTickets: builder.mutation({
      query: ({ body }) => ({
        url: "/anon/ticket_list",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
    getTickets: builder.mutation({
      query: ({ option, body }) => ({
        url: `/${option}/ticket_list`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        body,
      }),
    }),
    createTicket: builder.mutation({
      query: ({ body }) => ({
        url: "/tickets/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        body,
      }),
    }),
    showTicket: builder.mutation({
      query: ({ body }) => ({
        url: "/tickets/show",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        body,
      }),
    }),
  }),
});

export const {
  useGetAnonTicketsMutation,
  useGetTicketsMutation,
  useCreateTicketMutation,
  useShowTicketMutation,
} = ticketsApi;
