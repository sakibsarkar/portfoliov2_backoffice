import { api } from "@/redux/api/api";
import { IExperience } from "@/types/experience";

const experienceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllExperience: builder.query<{ data: IExperience[] }, undefined>({
      query: () => ({
        url: "/experience/get",
        method: "GET",
      }),
      providesTags: ["experience"],
    }),
    createExperience: builder.mutation<
      { data: IExperience },
      Omit<IExperience, "_id">
    >({
      query: (payload) => ({
        url: `/experience/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["experience"],
    }),
    updateExperienceById: builder.mutation<
      { data: IExperience },
      { experienceId: string; payload: Partial<IExperience> }
    >({
      query: ({ payload, experienceId }) => ({
        url: `/experience/update/${experienceId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["experience"],
    }),
    delteExperienceById: builder.mutation<{ data: IExperience }, string>({
      query: (experienceId) => ({
        url: `/experience/delete/${experienceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["experience"],
    }),
  }),
});
export const {
  useGetAllExperienceQuery,
  useCreateExperienceMutation,
  useUpdateExperienceByIdMutation,
  useDelteExperienceByIdMutation,
} = experienceApi;
