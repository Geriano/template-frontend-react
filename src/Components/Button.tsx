import classNames from 'classnames'
import React from 'react'

interface Props {
  className?: string
  type?: 'button'|'submit'|'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button(props: React.PropsWithChildren<Props>) {
  return (
    <button type={props.type || 'button'} {...props} className={classNames("px-3 py-1 transition-all duration-300 rounded", props.className)}>
      <div className="flex items-center space-x-1">
        {props.children}
      </div>
    </button>
  )
}