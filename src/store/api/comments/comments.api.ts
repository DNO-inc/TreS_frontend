import { api } from "../api";

export const commentsApi = api.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation({
      query: ({ body }) => ({
        url: "/comments/create",
        method: "POST",
        body,
      }),
    }),
    editComment: builder.mutation({
      query: ({ body }) => ({
        url: "/comments/edit",
        method: "POST",
        body,
      }),
    }),
    deleteComment: builder.mutation({
      query: ({ body }) => ({
        url: "/comments/delete",
        method: "DELETE",
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
    getCommentById: builder.mutation({
      query: ({ body }) => ({
        url: "/comments/get_comment_by_id",
        method: "POST",
        body,
      }),
    }),
    getActionById: builder.mutation({
      query: ({ body }) => ({
        url: "/comments/get_actions",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useGetCommentByIdMutation,
  useGetFullHistoryMutation,
  useGetActionByIdMutation,
} = commentsApi;
