
export interface Paginator<T> {
  meta: {
    total: number
    per_page: number
    current_page: number
    last_page: number
    first_page: number
    first_page_url: string|null
    last_page_url: string|null
    next_page_url: string|null
    previous_page_url: string|null
  }
  data: T[]
}

export const initial = {
  meta: {
    total: 0,
    current_page: 1,
    first_page: 1,
    first_page_url: null,
    last_page: 1,
    last_page_url: null,
    next_page_url: null,
    per_page: 10,
    previous_page_url: null,
  },
  data: [],
}