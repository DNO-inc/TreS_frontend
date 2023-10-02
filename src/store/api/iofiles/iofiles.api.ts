import { api } from "../api";

export const ioFilesApi = api.injectEndpoints({
  endpoints: builder => ({
    uploadFiles: builder.mutation({
      query: file => ({
        url: "/iofiles/upload_file",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
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
  useUploadFilesMutation,
  useGetFileMutation,
  useGetFilesIdsMutation,
} = ioFilesApi;
