import { api } from "../api";

export const ioFilesApi = api.injectEndpoints({
  endpoints: builder => ({
    uploadFiles: builder.mutation({
      query: file => ({
        url: "/iofiles/upload_file",
        method: "POST",
        body: file,
      }),
    }),
    getFiles: builder.mutation({
      query: body => ({
        url: "/iofiles/get_files",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useUploadFilesMutation, useGetFilesMutation } = ioFilesApi;
