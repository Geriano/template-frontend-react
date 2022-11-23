import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";
import Main from "./DashboardLayout/Main";
import Sidebar from "./DashboardLayout/Sidebar";

export default function DashboardLayout() {
  const { authenticated, user } = useAppSelector(state => state.auth)

  if (!authenticated) {
    return <Navigate to="/login" />
  }

  return (
    <div className="relative font-sans bg-gray-100 text-gray-700 flex text-sm ">
      <Sidebar />

      <Main>
        <Outlet />
      </Main>
    </div>
  )
}