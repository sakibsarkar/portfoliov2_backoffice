import { api } from "@/redux/api/api";
import { IProject } from "@/type/project";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAlllProjects: builder.query<{ data: IProject[] }, undefined>({
      query: () => ({
        url: "/project/get",
        method: "GET",
      }),
      providesTags: ["project"],
    }),
    updateProjectById: builder.mutation<
      { data: IProject },
      { projectId: string; payload: Partial<IProject> }
    >({
      query: ({ payload, projectId }) => ({
        url: `/project/update/${projectId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["project"],
    }),
    delteProjectById: builder.mutation<{ data: IProject }, string>({
      query: (projectId) => ({
        url: `/project/delete/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
  }),
});
export const {
  useGetAlllProjectsQuery,
  useUpdateProjectByIdMutation,
  useDelteProjectByIdMutation,
} = userApi;