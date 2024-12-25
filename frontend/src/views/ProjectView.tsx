import ProjectCard from "@/components/Cards/ProjectCard";
import CreateProject from "@/components/Project/CreateProject";
import DashboardHeading from "@/components/UIelements/DashboardHeading";
import FethingOverlay from "@/pages/shared/FethingOverlay";
import { useGetAlllProjectsQuery } from "@/redux/features/project/project.api";

const ProjectView = () => {
  const { data, isFetching, isLoading } = useGetAlllProjectsQuery(undefined);
  return (
    <div className="flex flex-col gap-[25px]">
      <DashboardHeading
        title="Mange Projects"
        description="Manage projects create new projects, edit and delete them"
      />

      <CreateProject />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
        {data?.data?.map((project) => (
          <ProjectCard project={project} key={project._id} />
        ))}
        {isFetching && !isLoading ? <FethingOverlay /> : ""}
      </div>
    </div>
  );
};

export default ProjectView;
