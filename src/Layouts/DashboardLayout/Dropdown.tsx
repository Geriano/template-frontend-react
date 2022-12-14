import classNames from "classnames"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../hooks"
import { logout as signout } from '../../Store/auth'
import { Link } from "react-router-dom"

export function Item(props: React.PropsWithChildren<{ [key: string]: any }>) {
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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const logout = () => {
    dispatch(signout())
      .unwrap()
      .then(() => navigate('/login'))
  }

  return (
    <>
      <Link to="/profile">
        <Item>
          <i className="mdi mdi-account" />
          <p>Profile</p>
        </Item>
      </Link>

      <Item
        onClick={logout}
      >
        <i className="mdi mdi-logout" />
        <p>Logout</p>
      </Item>
    </>
  )
}