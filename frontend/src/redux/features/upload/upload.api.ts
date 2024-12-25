import { api } from "@/redux/api/api";

const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create blog post
    uploadMultipleImage: builder.mutation<{ data: string[] }, FormData>({
      query: (id) => ({
        url: `/upload/multi`,
        method: "POST",
        body: id,
      }),
    }),
    uploadSingleImage: builder.mutation<{ data: string }, FormData>({
      query: (id) => ({
        url: `/upload/single`,
        method: "POST",
        body: id,
      }),
    }),
  }),
});
export const { useUploadMultipleImageMutation, useUploadSingleImageMutation } =
  uploadApi;
