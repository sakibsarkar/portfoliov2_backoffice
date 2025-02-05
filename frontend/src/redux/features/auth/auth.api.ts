import { api } from "@/redux/api/api";
import { TUser } from "@/types/user";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create blog post
    registerCustomer: builder.mutation({
      query: (post) => ({
        url: "/auth/register/customer",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    loginUser: builder.mutation({
      query: (post: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation({
      query: (payload: { oldPassword: string; password: string }) => ({
        url: "/auth/reset-password",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    getAuthor: builder.query<{ data: TUser }, undefined>({
      query: () => {
        return {
          url: `/auth/author`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
  }),
});
export const {
  useRegisterCustomerMutation,
  useLoginUserMutation,
  useGetAuthorQuery,
  useResetPasswordMutation,
} = userApi;
