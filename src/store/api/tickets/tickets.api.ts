import { api } from "../api";

export const ticketsApi = api.injectEndpoints({
  endpoints: builder => ({
    getTickets: builder.mutation({
      query: ({ option, body }) => ({
        url: `/${option}/ticket_list`,
        method: "POST",
        body,
      }),
    }),
    getSavedTickets: builder.mutation({
      query: ({ option, body }) => ({
        url: `/tickets/${option}`,
        method: "POST",
        body,
      }),
    }),
    getDeletedTickets: builder.mutation({
      query: ({ body }) => ({
        url: "/tickets/deleted",
        method: "POST",
        body,
      }),
    }),
    createTicket: builder.mutation({
      query: ({ body }) => ({
        url: "/tickets/create",
        method: "POST",
        body,
      }),
    }),
    showTicket: builder.mutation({
      query: ({ body }) => ({
        url: "/tickets/show",
        method: "POST",
        body,
      }),
    }),
    toggleLike: builder.mutation({
      query: ({ option, body }) => ({
        url: `/tickets/${option}`,
        method: "POST",
        body,
      }),
    }),
    toggleBookmark: builder.mutation({
      query: ({ option, body }) => ({
        url: `/tickets/${option}`,
        method: "POST",
        body,
      }),
    }),
    deleteTicket: builder.mutation({
      query: ({ body }) => ({
        url: "/tickets/delete",
        method: "DELETE",
        body,
      }),
    }),
    undeleteTicket: builder.mutation({
      query: ({ body }) => ({
        url: "/tickets/undelete",
        method: "POST",
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
  useUndeleteTicketMutation,
} = ticketsApi;
