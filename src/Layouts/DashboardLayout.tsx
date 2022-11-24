import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks";
import Main from "./DashboardLayout/Main";
import Sidebar from "./DashboardLayout/Sidebar";

export default function DashboardLayout() {
  const { authenticated } = useAppSelector(state => state.auth)
  const location = useLocation()

  if (!authenticated) {
    return <Navigate to={`/login?from=${location.pathname}`} />
  }

  return (
    <div className="relative font-sans bg-gray-200 text-gray-700 flex text-sm ">
      <Sidebar />

      <Main>
        <Outlet />
      </Main>
    </div>
  )
}