import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks";
import classNames from "classnames";
import Main from "./DashboardLayout/Main";
import Sidebar from "./DashboardLayout/Sidebar";

export default function DashboardLayout() {
  const { authenticated } = useAppSelector(state => state.auth)
  const flashes = useAppSelector(state => state.flash.value)
  const location = useLocation()

  if (!authenticated) {
    return <Navigate to={`/login?from=${location.pathname}`} />
  }

  return (
    <>
      <div className="relative font-sans bg-gray-200 text-gray-700 flex text-sm ">
        <Sidebar />

        <Main>
          <Outlet />
        </Main>
      </div>

      {flashes.filter(flash => flash).length > 0 && (
        <div className="fixed top-0 right-0 w-full max-w-xs h-fit flex flex-col space-y-2 p-4 z-20">
          { flashes.filter(flash => flash).map((flash, i) => (
            <div key={i} className={classNames("bg-white border-l-8 px-4 py-2 rounded-md shadow", {
              'border-success-0': flash!.type === 'success',
              'border-danger-0': flash!.type === 'error',
              'border-info-0': flash!.type === 'info',
              'border-warning-0': flash!.type === 'warning',
            })}>
              {flash!.message}
            </div>
          )) }
        </div>
      )}
    </>
  )
}