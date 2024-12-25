import { CreateSkill } from "@/components/Skill/CreateSkill";
import DeleteSkill from "@/components/Skill/DeleteSkill";
import { UpdateSkill } from "@/components/Skill/UpdateSkill";
import DashboardHeading from "@/components/UIelements/DashboardHeading";
import FethingOverlay from "@/pages/shared/FethingOverlay";
import { useGetAllSkillsQuery } from "@/redux/features/skill/skill.api";
import { getExpertise } from "@/utils/getExpertise";

const SkillView = () => {
  const { data, isFetching, isLoading } = useGetAllSkillsQuery(undefined);

  return (
    <div className="flex flex-col gap-[25px]">
      <DashboardHeading
        title="Mange Skills"
        description="Manage Skills create new skills, edit and delete them"
      />

      <CreateSkill />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[15px] center mx-auto w-full relative">
        {data?.data?.map((skill, i) => {
          const expertise = getExpertise(skill.expertise);
          return (
            <div
              className="bg-white w-full py-[18px] group/skill boxShadowHover relative overflow-hidden"
              key={i + "skill"}
            >
              <span
                className="absolute w-full text-center center bg-primary text-white hidden group-hover/skill:flex py-[5px] z-[2]"
                style={{ right: -71, top: 31, transform: "rotate(45deg)" }}
              >
                {expertise}
              </span>
              <div className="w-[136px] h-[120px] mx-auto">
                <img
                  className="w-full h-full object-cover group-hover/skill:rotate-[360deg]"
                  style={{ transition: "0.8s" }}
                  width={136}
                  height={120}
                  src={skill.image}
                  alt={skill.label}
                />
              </div>

              <p className="text-center text-[25px] font-[600] mt-[20px]">
                {skill.label}
              </p>
              <div className="flex items-center justify-end gap-[15px] px-[15px]">
                <UpdateSkill skill={skill} />
                <DeleteSkill skillId={skill._id} skillName={skill.label} />
              </div>
            </div>
          );
        })}

        {isLoading && !isFetching && <FethingOverlay />}
      </div>
    </div>
  );
};

export default SkillView;
