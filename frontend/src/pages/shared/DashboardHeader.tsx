import { ISideBarState } from "@/Layouts/AdminDashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import ThemeChanger from "./ThemeChanger";

const DashboardHeader: React.FC<ISideBarState> = ({ setIsOpen }) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="w-full flex items-center justify-between px-[20px]  py-[10px] border-b-[1px] border-input shrink-0">
      <img
        width={50}
        height={50}
        src="/images/logo.jpg"
        alt="logo"
        className="w-[50px] md:flex hidden mix-blend-difference"
      />
      <Button
        className="menuBTn flex md:hidden"
        onClick={() => setIsOpen(true)}
        variant={"ghost"}
      >
        <IoMenu />
      </Button>
      <div className="flex items-center justify-end gap-[8px]">
        <ThemeChanger />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.image || ""} alt="user avatar" />
              <AvatarFallback>
                <p className="text-muted-foreground uppercase">
                  {user?.firstName?.slice(0, 1)}
                  {user?.lastName?.slice(0, 1)}
                </p>
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={"/"}>Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={"/dashboard/admin/manage-bookings"}>
                Booking Manage
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to={"/"}>Setting</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
