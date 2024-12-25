import Blog from "@/pages/dashboard/Blog";
import CreateBlog from "@/pages/dashboard/CreateBlog";
import DashboarRoot from "@/pages/dashboard/DashboarRoot";
import Expereince from "@/pages/dashboard/Expereince";
import Projects from "@/pages/dashboard/Projects";
import Skill from "@/pages/dashboard/Skill";
import UpdateBlog from "@/pages/dashboard/UpdateBlog";

export const adminRoutes = [
  {
    index: true,
    path: "",
    element: <DashboarRoot />,
  },
  {
    index: true,
    path: "projects",
    element: <Projects />,
  },
  {
    index: true,
    path: "expereince",
    element: <Expereince />,
  },
  {
    index: true,
    path: "skill",
    element: <Skill />,
  },
  {
    index: true,
    path: "blog",
    element: <Blog />,
  },
  {
    index: true,
    path: "blog/create",
    element: <CreateBlog />,
  },
  {
    index: true,
    path: "blog/update/:blogId",
    element: <UpdateBlog />,
  },
];
