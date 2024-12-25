import { api } from "@/redux/api/api";
import { IBlog } from "@/types/blog";

const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query<{ data: IBlog[] }, undefined>({
      query: () => ({
        url: "/blog/get",
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    getAllBlogById: builder.query<{ data: IBlog }, string>({
      query: (blogId) => ({
        url: `/blog/get/${blogId}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    createBlog: builder.mutation<
      { data: IBlog },
      Omit<IBlog, "_id" | "createdAt">
    >({
      query: (payload) => ({
        url: `/blog/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["blog"],
    }),
    updateBlogById: builder.mutation<
      { data: IBlog },
      { blogId: string; payload: Partial<IBlog> }
    >({
      query: ({ payload, blogId }) => ({
        url: `/blog/update/${blogId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["blog"],
    }),
    delteBlogById: builder.mutation<{ data: IBlog }, string>({
      query: (blogId) => ({
        url: `/blog/delete/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});
export const {
  useGetAllBlogsQuery,
  useGetAllBlogByIdQuery,
  useCreateBlogMutation,
  useDelteBlogByIdMutation,
  useUpdateBlogByIdMutation,
} = blogApi;
