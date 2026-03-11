import { useAuthStore } from "../store/AuthStore.js"
import { useFavoriteStore } from "../store/FavoriteStore.js"

import { NavLink } from "react-router"

import { Link } from "./Link"

export function Header() {
  return (
    <header className="header">
      <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1>
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          Devjobs
        </h1>
      </Link>

      <nav className="nav">
        <NavLink className={({ isActive }) => isActive ? "nav-link-active" : ""} to="/search">Empleos</NavLink>
      </nav>

      <FavoriteCount />

      <UserButton />

    </header>

  )
}
const UserButton = () => {
  const { isLoggedIn, login, logout } = useAuthStore();

  return (
    isLoggedIn ?
      <button onClick={logout}>Cerrar Sesión</button> :
      <button onClick={login}>Iniciar Sesión</button>
  )
}

const FavoriteCount = () => {
  const { countFavorites } = useFavoriteStore();
  const { isLoggedIn } = useAuthStore();

  return (isLoggedIn &&
    <Link to="/profile" className="profile-link" >
      Empleos guardados: {countFavorites()}
    </Link>
  );
}