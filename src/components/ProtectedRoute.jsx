import { Navigate } from 'react-router';
import { useAuthStore } from '../store/AuthStore';

export function ProtectedRoute({ children, redirectTo = '/' }) {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}