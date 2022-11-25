import React from "react";
import { Link, useLocation, useResolvedPath } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import classNames from "classnames";

interface Props {
  to: string
  icon?: string
}

export default function SidebarLink({ to, icon, children }: React.PropsWithChildren<Props>) {
  const open = useAppSelector(state => state.DashboardLayout.open.sidebar)
  const route = useResolvedPath(to)
  const location = useLocation()
  const active = route.pathname === location.pathname

  return (
    <Link to={to}>
      <div
        className={classNames("hover:bg-primary-1 transition-all duration-300 cursor-pointer", {
          'px-2': open,
          'border-l-8 border-primary-2 bg-primary-1': active,
        })}
      >
        <div 
          className={classNames("flex items-center space-x-2 px-4 py-2", {
            'justify-center': !open,
            'border-b border-primary-1': open,
          })}
        >
          <i className={`mdi mdi-${icon || 'circle'}`} />
          {open && (
            <p className="capitalize font-medium">
              {children}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}