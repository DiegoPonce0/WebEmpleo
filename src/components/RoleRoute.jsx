import { useAuthStore } from '../store/AuthStore'
import { Navigate } from 'react-router'

export function RoleRoute ({ allow, children }) {
  const user = useAuthStore(state => state.user)

  if (!user ) return <Navigate to='/login' />

  if (!allow.includes(user.role)) {
    return <Navigate to="/profile" /> 
  }

  return children
}