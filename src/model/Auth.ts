export interface Auth {
  token?: string | null
}

export const initAuth = (): Auth => ({
  token: null
})
