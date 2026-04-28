import { useEffect } from 'react'
import { useAuthStore } from '../store/AuthStore'
import { useFavoriteStore } from '../store/FavoriteStore'

export function useAuthCheck() {
  const login = useAuthStore(state => state.login)
  const logout = useAuthStore(state => state.logout)
  
  const resetFavorites = useFavoriteStore(state => state.resetFavorites)

  useEffect(() => {
    async function checkAuth() {
      try{        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        credentials: 'include'
      })
        if (!response.ok){
          throw new Error()
        } 
        
        const data = await response.json()
        login(data.user)

        await useFavoriteStore.getState().fetchFavorites()

      }  catch {
        logout()
        resetFavorites()
      }
    }

    checkAuth()
  }, [login, logout, resetFavorites])
}