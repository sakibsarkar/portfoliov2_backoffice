import DashboardHeader from "@/pages/shared/DashboardHeader";
import React, { SetStateAction, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import { ThemeProvider } from "../components/ui/ThemeProvider";
export interface ISideBarState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}
const AdminDashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ThemeProvider defaultTheme="light">
      <div className="w-full h-screen flex items-start justify-start pb-[30px]">
        <Sidebar isOpen={isOpen} setIsopen={setIsOpen} />
        <div
          className={`${
            isOpen ? "w-full md:w-[calc(100%-287px)]" : "w-full"
          } h-full flex-col flex`}
        >
          <DashboardHeader isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="h-full overflow-auto smoothBar p-[20px] md:p-[25px] lg:p-[50px] dashRoot">
            <Outlet />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminDashboardLayout;
