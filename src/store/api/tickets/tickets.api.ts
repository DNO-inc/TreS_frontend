import { api } from "../api";

export const ticketsApi = api.injectEndpoints({
  endpoints: builder => ({
    getTickets: builder.mutation({
      query: ({ option, body }) => ({
        url: `/${option}/ticket_list`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body,
      }),
    }),
    getSavedTickets: builder.mutation({
      query: ({ option, body }) => ({
        url: `/tickets/${option}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body,
      }),
    }),
    getDeletedTickets: builder.mutation({
      query: ({ body }) => ({
        url: "/tickets/deleted",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
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
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
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
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
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
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
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
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body,
      }),
    }),
    deleteTicket: builder.mutation({
      query: ({ body }) => ({
        url: "/tickets/delete",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body,
      }),
    }),
  }),
});

export const {
  useGetTicketsMutation,
  useGetSavedTicketsMutation,
  useGetDeletedTicketsMutation,
  useCreateTicketMutation,
  useShowTicketMutation,
  useToggleLikeMutation,
  useToggleBookmarkMutation,
  useDeleteTicketMutation,
} = ticketsApi;
