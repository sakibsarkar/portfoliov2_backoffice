import ProjectCard from "@/components/Cards/ProjectCard";
import FethingOverlay from "@/pages/shared/FethingOverlay";
import { useGetAlllProjectsQuery } from "@/redux/features/project/project.api";

const ProjectView = () => {
  const { data, isFetching, isLoading } = useGetAlllProjectsQuery(undefined);
  return (
    <div>
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
