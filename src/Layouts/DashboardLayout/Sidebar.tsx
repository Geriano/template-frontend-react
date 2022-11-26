import classNames from "classnames";
import { useAppDispatch, useAppSelector, usePermission, useRole } from "../../hooks";
import { sidebar } from "../../Store/DashboardLayout";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  const { sidebar: open } = useAppSelector(state => state.DashboardLayout.open)
  const dispatch = useAppDispatch()
  const toggle = () => dispatch(sidebar())
  const APP_NAME = import.meta.env.VITE_APP_NAME
  const role = useRole()
  const permission = usePermission()

  return (
    <div 
      className={classNames("absolute md:static flex-none h-screen overflow-y-auto bg-primary-0 text-white transition-all duration-300 shadow-xl z-30", {
        'w-full md:w-56': open,
        '-left-14 w-14': !open,
      })}
    >
      <div 
        className={classNames("w-full h-14 flex items-center", {
          'justify-between px-4': open,
          'justify-center': !open,
        })}
      >
        {
          open && (
            <>
              <i
                className={classNames("mdi mdi-chevron-double-left text-lg invisible")}
              />

              <div className="text-center text-xl font-bold">
                {APP_NAME}
              </div>
            </>
          )
        }

        <i
          onClick={toggle}
          className={classNames("mdi mdi-chevron-double-left transition-all duration-[500ms] cursor-pointer text-lg", {
            '-rotate-180': !open,
          })}
        />
      </div>

      <SidebarLink to="/dashboard" icon="view-dashboard">
        dashboard
      </SidebarLink>

      {role.has(['superuser']) && (
        <>
          <SidebarLink to="/superuser/permission" icon="key">
            permission
          </SidebarLink>

          <SidebarLink to="/superuser/role" icon="account-lock-open">
            role
          </SidebarLink>

          <SidebarLink to="/superuser/user" icon="account-group">
            user
          </SidebarLink>
        </>
      )}
    </div>
  )
}