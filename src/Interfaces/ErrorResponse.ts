export interface FromValidationErrorResponse<T = string> {
  errors: {
    field: T
    message: string
  }[]
}