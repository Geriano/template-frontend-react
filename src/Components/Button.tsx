import classNames from 'classnames'
import React from 'react'

interface Props {
  className?: string
  type?: 'button'|'submit'|'reset'
  disabled?: boolean
  form?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function Button(props: React.PropsWithChildren<Props>) {
  return (
    <button type={props.type || 'button'} {...props} className={classNames("px-3 py-1 transition-all duration-300 rounded", props.className)}>
      <div className="flex items-center space-x-1">
        {props.children}
      </div>
    </button>
  )
}

export const Primary = Button.Primary = function (props: React.PropsWithChildren<Props>) {
  return (
    <Button {...props} className={classNames("bg-primary-0 hover:bg-primary-1 active:bg-primary-2 text-white", props.className)}>
      {props.children}
    </Button>
  )
}

export const Success = Button.Success = function (props: React.PropsWithChildren<Props>) {
  return (
    <Button {...props} className={classNames("bg-success-0 hover:bg-success-1 active:bg-success-2 text-white", props.className)}>
      {props.children}
    </Button>
  )
}

export const Danger = Button.Danger = function (props: React.PropsWithChildren<Props>) {
  return (
    <Button {...props} className={classNames("bg-danger-0 hover:bg-danger-1 active:bg-danger-2 text-white", props.className)}>
      {props.children}
    </Button>
  )
}

export const Warning = Button.Warning = function (props: React.PropsWithChildren<Props>) {
  return (
    <Button {...props} className={classNames("bg-warning-0 hover:bg-warning-1 active:bg-warning-2 text-white", props.className)}>
      {props.children}
    </Button>
  )
}

export const Info = Button.Info = function (props: React.PropsWithChildren<Props>) {
  return (
    <Button {...props} className={classNames("bg-info-0 hover:bg-info-1 active:bg-info-2 text-white", props.className)}>
      {props.children}
    </Button>
  )
}

export default Button