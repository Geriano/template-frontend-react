import classNames from "classnames";
import React from "react";

interface Props {
  label: string
  type?: string
  name?: string
  value?: any
  autoFocus?: boolean
  required?: boolean
  disabled?: boolean
  color?: string
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void
}

export default function Input(props: Props) {
  return (
    <div className="relative">
      <input 
        type="text" 
        {...props}
        className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " 
      />
      <label 
        className={classNames("absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1", {
          'bg-white': !props.color,
          [`bg-${props.color}`]: props.color,
        })}
      >
        {props.label}
      </label>
  </div>
  )
}
