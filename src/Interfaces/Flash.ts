export type t = 'success'|'error'|'info'|'warning'

export type Flash = null | {
  type: t
  message: string
}

export interface State {
  value: Flash[]
}