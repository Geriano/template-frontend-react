import classNames from 'classnames'
import React from 'react'

interface Props {
  className?: string
}

export function Card({ className, children }: React.PropsWithChildren<Props>) {
  return (
    <div className={classNames("w-full h-full rounded-md bg-white shadow-xl border border-gray-100", className)}>
      {children}
    </div>
  )
}

export const Header = Card.Header = function ({ className, children }: React.PropsWithChildren<Props>) {
  return (
    <div className={classNames("w-full bg-gray-100 rounded-t-md", className)}>
      {children}
    </div>
  )
}

export const Footer = Card.Footer = function ({ className, children }: React.PropsWithChildren<Props>) {
  return (
    <div className={classNames("w-full bg-gray-100 rounded-b-md", className)}>
      {children}
    </div>
  )
}

export default Card