import { api } from "./api";

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
    getCommentById: builder.mutation({
      query: ({ body }) => ({
        url: "/comments/get_comment_by_id",
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
} = commentsApi;
