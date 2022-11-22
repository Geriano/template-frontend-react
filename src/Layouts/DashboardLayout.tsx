import { Outlet } from "react-router-dom";
import Main from "./DashboardLayout/Main";
import Sidebar from "./DashboardLayout/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="relative font-sans bg-gray-100 text-gray-700 flex text-sm ">
      <Sidebar />

      <Main>
        <Outlet />
      </Main>
    </div>
  )
}