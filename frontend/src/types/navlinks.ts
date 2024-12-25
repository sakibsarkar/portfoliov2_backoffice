import { IconType } from "react-icons";
import { FaBoxes } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
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
    href: "/dashboard/vendors",
    Icon: FaBoxes,
    title: "vendors",
  },
];
