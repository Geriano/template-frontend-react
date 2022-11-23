import classNames from 'classnames'
import React from 'react'

interface Props {
  header?: JSX.Element
  footer?: JSX.Element
  className?: string
}

export function Card({ className, header, footer, children }: React.PropsWithChildren<Props>) {
  return (
    <div className={classNames("w-full h-full rounded-md bg-white shadow", className)}>
      { header && (
        <div className="bg-gray-100 w-full rounded-t-md">
          { header }
        </div>
      ) }
      <div 
        className={classNames("bg-transparent w-full h-full", {
          'rounded-t-md': !header,
          'rounded-b-md': !footer,
        })}
      >
        {children}
      </div>
      { footer && (
        <div className="bg-gray-100 full rounded-b-md">
          { footer }
        </div>
      ) }
    </div>
  )
}