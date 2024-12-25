import { IconType } from "react-icons";
import { BsBriefcase } from "react-icons/bs";
import { GrServices } from "react-icons/gr";
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
];
