import ExperienceCard from "@/components/Cards/ExperienceCard";
import { CreateExperience } from "@/components/Experience/CreateExperience";
import DashboardHeading from "@/components/UIelements/DashboardHeading";
import { useGetAllExperienceQuery } from "@/redux/features/expereince/expereince.api";

const ExpereinceView = () => {
  const { data } = useGetAllExperienceQuery(undefined);
  return (
    <div className="flex flex-col gap-[25px]">
      <DashboardHeading
        title="Mange Expereince"
        description="Manage expereince add new expereince, edit and delete them"
      />
      <CreateExperience />
      <div className="flex flex-col gap-[15px]">
        {data?.data.map((exp) => (
          <ExperienceCard experience={exp} />
        ))}
      </div>
    </div>
  );
};

export default ExpereinceView;
