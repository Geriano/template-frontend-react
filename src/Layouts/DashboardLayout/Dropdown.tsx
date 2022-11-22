import classNames from "classnames"
import React from "react"
import { useNavigate } from "react-router-dom"

export function Link(props: React.PropsWithChildren<{ [key: string]: any }>) {
  return (
    <div
      {...props}
      className={classNames("w-full flex items-center space-x-2 hover:bg-gray-50 border-b px-4 py-2 transition-all duration-300 cursor-pointer", props.className)}
    >
      {props.children}
    </div>
  )
}

export default function Dropdown() {
  const navigate = useNavigate()
  const logout = () => navigate('/login')

  return (
    <>
      <Link>
        <i className="mdi mdi-account" />
        <p>Profile</p>
      </Link>

      <Link
        onClick={logout}
      >
        <i className="mdi mdi-logout" />
        <p>Logout</p>
      </Link>
    </>
  )
}