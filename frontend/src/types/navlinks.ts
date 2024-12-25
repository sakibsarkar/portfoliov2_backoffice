import { IconType } from "react-icons";
import { BsBriefcase } from "react-icons/bs";
import { GrNotes, GrServices } from "react-icons/gr";
import { LuBrainCircuit } from "react-icons/lu";
import { PiProjectorScreenChartThin } from "react-icons/pi";
export interface NavItem {
  href: string;
  title: string;
  Icon: IconType;
}
export const adminLinks: NavItem[] = [
  {
    href: "/dashboard",
    Icon: GrServices,
    title: "Dashboard",
  },
  {
    href: "/dashboard/projects",
    Icon: PiProjectorScreenChartThin,
    title: "Manage Projects",
  },
  {
    href: "/dashboard/expereince",
    Icon: BsBriefcase,
    title: "Manage Expereince",
  },
  {
    href: "/dashboard/skill",
    Icon: LuBrainCircuit,
    title: "Manage Skill set",
  },
  {
    href: "/dashboard/blog",
    Icon: GrNotes,
    title: "Manage Blogs",
  },
];
