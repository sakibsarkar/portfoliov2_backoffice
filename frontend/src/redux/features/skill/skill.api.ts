import { api } from "@/redux/api/api";
import { ISkill } from "@/types/skill";

const skillApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSkills: builder.query<{ data: ISkill[] }, undefined>({
      query: () => ({
        url: "/skill/get",
        method: "GET",
      }),
      providesTags: ["skill"],
    }),
    createSkill: builder.mutation<{ data: ISkill }, Omit<ISkill, "_id">>({
      query: (payload) => ({
        url: `/skill/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["skill"],
    }),
    updateSkillById: builder.mutation<
      { data: ISkill },
      { skillId: string; payload: Partial<ISkill> }
    >({
      query: ({ payload, skillId }) => ({
        url: `/skill/update/${skillId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["skill"],
    }),
    delteSkillById: builder.mutation<{ data: ISkill }, string>({
      query: (skillId) => ({
        url: `/skill/delete/${skillId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["skill"],
    }),
  }),
});
export const {
  useGetAllSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillByIdMutation,
  useDelteSkillByIdMutation,
} = skillApi;
