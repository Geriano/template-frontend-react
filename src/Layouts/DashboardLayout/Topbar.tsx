import classNames from "classnames"
import { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { dropdown, sidebar } from "../../Store/DashboardLayout"
import Dropdown from './Dropdown'

export default function Topbar() {
  const { user } = useAppSelector(state => state.auth)
  const { dropdown: open } = useAppSelector(state => state.DashboardLayout.open)
  const dispatch = useAppDispatch()
  const toggle = () => dispatch(dropdown())
  const trigger = useRef<HTMLElement|null>(null)
  const floating = useRef<HTMLDivElement|null>(null)
  const click = (e: MouseEvent) => open && floating.current && ![floating.current, trigger.current].includes(e.target as HTMLElement) && dispatch(dropdown(false))

  useEffect(() => {
    document.addEventListener('click', click)

    return () => {
      document.removeEventListener('click', click)
    }
  }, [open])

  return (
    <div className="sticky top-0 left-0 w-full h-14 flex-none flex items-center justify-between md:justify-end px-4 bg-gray-50 shadow z-20">
      <div className="md:hidden flex items-center justify-center">
        <i
          onClick={() => dispatch(sidebar())}
          className={classNames("mdi mdi-chevron-double-left transition-all duration-[500ms] cursor-pointer text-lg", {
            '-rotate-180': !open,
          })}
        />
      </div>
      
      <div className="relative w-full max-w-xs h-14 flex items-center justify-end space-x-2">
        <p className="capitalize">{user.name}</p>
        <i 
          ref={trigger}
          onClick={toggle}
          className="mdi mdi-menu-down text-xl cursor-pointer" 
        />

        <div
          ref={floating}
          className={classNames("absolute right-0 w-48 flex flex-col bg-white rounded-md p-2 transition-all duration-300 shadow", {
            'top-10': open,
            '-top-[100vh]': !open,
          })}
        >
          <Dropdown />
        </div>
      </div>
    </div>
  )
}