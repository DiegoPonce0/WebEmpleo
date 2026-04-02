import { Navigate } from 'react-router'
import { useAuthStore } from '../store/AuthStore'

export function ProtectedRoute({ children, redirectTo = '/login' }) {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)
  const isLoading = useAuthStore(state => state.isLoading)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} />
  }

  return children
}