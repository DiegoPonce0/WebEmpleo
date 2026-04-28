import { useNavigate, useLocation } from 'react-router'

export function useNavigateHook() {
    const navigate = useNavigate()
    const location = useLocation()
    
    function navigateTo(path) {
        navigate(path)
    }
    
    return { navigate, location, currentPath: location.pathname, navigateTo }
}