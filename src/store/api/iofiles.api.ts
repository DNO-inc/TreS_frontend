import { api } from "./api";

export const ioFilesApi = api.injectEndpoints({
  endpoints: builder => ({
    uploadFile: builder.mutation({
      query: file => ({
        url: "/iofiles/upload_file",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      }),
    }),
    deleteFile: builder.mutation({
      query: file_id => ({
        url: "/iofiles/delete_file",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file_id,
      }),
    }),
    getFile: builder.mutation({
      query: fileId => ({
        url: `/iofiles/${fileId}`,
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseHandler: (response: { blob: () => any }) => response.blob(),
      }),
    }),
    getFilesIds: builder.mutation({
      query: file => ({
        url: "/iofiles/get_file_ids",
        method: "POST",
        body: file,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
  }),
});

export const {
  useUploadFileMutation,
  useDeleteFileMutation,
  useGetFileMutation,
  useGetFilesIdsMutation,
} = ioFilesApi;
