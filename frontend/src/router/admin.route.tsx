import DashboarRoot from "@/pages/dashboard/DashboarRoot";
import Projects from "@/pages/dashboard/Projects";

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
];
