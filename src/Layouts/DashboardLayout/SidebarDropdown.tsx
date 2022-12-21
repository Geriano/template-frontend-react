import classNames from "classnames";
import React, { LegacyRef, useRef, useState } from "react";
import { useAppSelector } from "../../hooks";
import { Transition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";

interface Props {
  icon?: string
  label: string
}

export default function SidebarDropdown({ label, icon, children }: React.PropsWithChildren<Props>) {
  const open = useAppSelector(state => state.DashboardLayout.open.sidebar)
  const [show, setShow] = useState(false)
  const el = useRef<HTMLElement|undefined>()
  
  const toggle = () => setShow(!show)

  return (
    <div className={classNames("flex flex-col")}>
      <div
        className={classNames("hover:bg-primary-1 transition-all duration-300 cursor-pointer", {
          'px-2': open,
          'border-l-8 border-primary-2 bg-primary-1': show,
        })}
        onClick={toggle}
      >
        <div 
          className={classNames("flex items-center space-x-2 px-4 py-2", {
            'justify-center': !open,
            'border-b border-primary-1': open,
          })}
        >
          <i className={`mdi mdi-${icon || 'circle'}`} />
          {open && (
            <div className="w-full">
              <p className="capitalize font-medium">
                {label}
              </p>
            </div>
          )}
          <div className={classNames("flex-none transition-all duration-300", {
            'rotate-90': !show,
          })}>
            <i className="mdi mdi-menu-down"></i>
          </div>
        </div>
      </div>

      <Transition 
        nodeRef={el} 
        in={show} 
        duration={300} 
        addEndListener={() => {}}
      >
        {(state: TransitionStatus) => {
          console.log(state)
          return (
            <div ref={el as LegacyRef<HTMLDivElement>|undefined} className={classNames("flex flex-col transition-all", {
              '-translate-x-full opacity-0': state === 'exiting',
              '-translate-x-0 opacity-100': state === 'entering',
              'h-0 overflow-hidden': ['exiting', 'exited',].includes(state),
            })}>
              {children}
            </div>
          )
        }}
      </Transition>
    </div>
  )
}