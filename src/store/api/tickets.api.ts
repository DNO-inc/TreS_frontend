import { api } from "./api";

export const ticketsApi = api.injectEndpoints({
  endpoints: builder => ({
    createTicket: builder.mutation({
      query: ({ body }) => ({
        url: "/tickets/create",
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
    getDeletedTickets: builder.mutation({
      query: ({ body }) => ({
        url: "/tickets/deleted",
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
    toggleLike: builder.mutation({
      query: ({ option, body }) => ({
        url: `/tickets/${option}`,
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
    getTickets: builder.mutation({
      query: ({ option, body }) => ({
        url: `/${option}/ticket_list`,
        method: "POST",
        body,
      }),
    }),
    showTicket: builder.mutation({
      query: ({ admin, body }) => ({
        url: `${admin || ""}/tickets/show`,
        method: "POST",
        body,
      }),
    }),
    getFullHistory: builder.mutation({
      query: ({ body }) => ({
        url: "/tickets/full_history",
        method: "POST",
        body,
      }),
    }),
    getActionById: builder.mutation({
      query: ({ body }) => ({
        url: "/tickets/get_action",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useDeleteTicketMutation,
  useUndeleteTicketMutation,
  useGetDeletedTicketsMutation,
  useToggleBookmarkMutation,
  useToggleLikeMutation,
  useGetSavedTicketsMutation,
  useGetTicketsMutation,
  useShowTicketMutation,
  useGetFullHistoryMutation,
  useGetActionByIdMutation,
} = ticketsApi;
