import { useEffect } from 'react'
import { useAuthStore } from '../store/AuthStore'

export function useAuthCheck() {
  const login = useAuthStore(state => state.login)
  const logout = useAuthStore(state => state.logout)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data) => login(data.user))
      .catch(() => logout())
  }, [login, logout])
}