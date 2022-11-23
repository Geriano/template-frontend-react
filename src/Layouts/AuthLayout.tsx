import classNames from "classnames";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { relog } from "../Store/auth";

export default function AuthLayout() {
  const { authenticated, token } = useAppSelector(state => state.auth)
  const { value: flashes } = useAppSelector(state => state.flash)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [ ready, set ] = useState(false)

  useEffect(() => {
    if (authenticated) {
      navigate('/')
    } else {
      if (token) {
        dispatch(relog())
          .unwrap()
          .catch(() => set(true))
      } else {
        set(true)
      }
    }
  }, [])

  if (authenticated) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div className="font-sans text-sm flex items-center justify-center w-full h-screen bg-gray-200">
        { ready && <Outlet /> }
      </div>

      {flashes.filter(flash => flash).length > 0 && (
        <div className="fixed top-0 right-0 w-full max-w-xs h-fit flex flex-col space-y-2 p-4">
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