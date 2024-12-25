import { IProject } from "@/type/project";
import { FaGithub } from "react-icons/fa";
import { IoCodeSlash } from "react-icons/io5";
import { Link } from "react-router-dom";
import DeleteProject from "../Project/DeleteProject";
import UpdateProject from "../Project/UpdateProject";
interface IProps {
  project: IProject;
}
const ProjectCard: React.FC<IProps> = ({ project }) => {
  return (
    <div className="bg-white w-full">
      <div className="w-full h-[235px] bg-[#28282825] center">
        <img
          src={project.thumbnail}
          alt="project thumbnail"
          width={500}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-[10px] flex flex-col gap-[10px]">
        <Link
          to={`/project/${project._id}`}
          className="text-[#282828] font-[700] text-[20px] line-clamp-2 h-[60px] hover:underline"
        >
          {project.name}
        </Link>
        <p className="text-[#282828] text-[15px] line-clamp-4">
          {project.description}
          Mauto is a dynamic car selling website built on the MERN stack. allows
          users to explore a variety of cars from different brands, update
          existing listings, add new products, and delete items ..
        </p>
        <p className="text-[#555555] font-[700]">
          Tech stack:{" "}
          {project.tech_stack.slice(0, 4).map((tech, i) => (
            <span key={i}>{tech}, </span>
          ))}
        </p>

        <div className="mt-[30px] flex items-center justify-between gap-[15px]">
          <div className="flex items-center gap-[5px]">
            <UpdateProject project={project} />
            <DeleteProject projectId={project._id} projectName={project.name} />
          </div>
          <div className="center gap-[15px]">
            <Link
              to={project.github_link}
              className="w-[40px] h-[40px] center gap-[5px] bg-[#ebebeb] rounded-full hover:w-[121.594px] group/github p-[8px] overflow-hidden hover:text-black "
              style={{ transition: "0.3s" }}
            >
              <FaGithub className="text-[25px]" />
              <span className="hidden group-hover/github:block shrink-0">
                Github link
              </span>
            </Link>
            <Link
              style={{ transition: "0.3s" }}
              to={project.live_link}
              className="w-fit h-[40px] center gap-[5px] bg-[#ebebeb] rounded-full p-[8px] overflow-hidden hover:scale-[1.1]"
            >
              <IoCodeSlash className="text-[25px]" />
              <span className="shrink-0">Live link</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
