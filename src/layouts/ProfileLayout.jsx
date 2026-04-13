import { useState } from 'react'

import { NavLink, Outlet } from 'react-router'

import { useAuthStore } from '../store/AuthStore'

import styles from './ProfileLayout.module.css'

export function ProfileLayout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const logout = useAuthStore(state => state.logout)
  const user = useAuthStore(state => state.user )


  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Error trying to logout:', error)
    } finally {
      logout()
    }
  }

  return (
    <div className={styles.container}>
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className={styles.backdrop} 
          onClick={toggleSidebar}
        />
      )}

      <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.collapsed : ''}`}>
        <h2 className={styles.title}>My Account</h2>

        <nav className={styles.nav}>
          
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
            onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
           >
            <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span className={styles.linkText}>Home</span>
          </NavLink>
          
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
            onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
          >
            <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span className={styles.linkText}>Profile</span>
          </NavLink>

          <NavLink
            to="/profile/edit"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
            onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
          >
            <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            <span className={styles.linkText}>Edit Profile</span>
          </NavLink>

          <NavLink
            to="/profile/favorites"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
            onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
          >
            <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span className={styles.linkText}>Job Favorites</span>
          </NavLink>

          <NavLink
            to="/profile/applied"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
            onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
          >
            <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            <span className={styles.linkText}>Job Applications</span>
          </NavLink>

          {['employer', 'admin'].includes(user?.role) && (
            <>
              <NavLink
                to="/profile/create"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
                onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
              >
                <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span className={styles.linkText}>Create Job</span>
              </NavLink>

              <NavLink
                to="/profile/candidates"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
                onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
              >
                <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <span className={styles.linkText}>Candidates</span>
              </NavLink>
            </>
          )}

          <button className={styles.logoutBtn} onClick={handleLogout}>
            <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span className={styles.linkText}>Logout</span>
          </button>
        </nav>
      </aside>

      <main className={styles.content}>
        <button className={styles.toggleBtn} onClick={toggleSidebar}>
          {isSidebarOpen ? '✕' : '☰'}
        </button>
        <Outlet />
      </main>
    </div>
  )
}