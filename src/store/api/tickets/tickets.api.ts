import { api } from "../api";

export const ticketsApi = api.injectEndpoints({
  endpoints: builder => ({
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
    getSavedTickets: builder.query({
      query: ({ option }) => ({
        url: `/tickets/${option}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
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
    toggleLike: builder.mutation({
      query: ({ option, body }) => ({
        url: `/tickets/${option}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        body,
      }),
    }),
    toggleBookmark: builder.mutation({
      query: ({ option, body }) => ({
        url: `/tickets/${option}`,
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
  useGetTicketsMutation,
  useGetSavedTicketsQuery,
  useCreateTicketMutation,
  useShowTicketMutation,
  useToggleLikeMutation,
  useToggleBookmarkMutation,
} = ticketsApi;