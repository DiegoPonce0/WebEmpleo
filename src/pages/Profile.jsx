import { useAuthStore } from '../store/AuthStore.js'

import styles from './Profile.module.css'

export default function Profile() {
  const logout = useAuthStore(state => state.logout)
  const user = useAuthStore(state => state.user)

  const handleLogout = async () => {
    try {
        await fetch ( `${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      logout()
    }
  }


  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <svg 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className={styles.name}>{user?.name || 'Cargando...'}</h1>
          <p className={styles.email}>{user?.email}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Información Personal</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Nombre completo</span>
              <span className={styles.infoValue}>Usuario Demo</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>usuario@ejemplo.com</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Teléfono</span>
              <span className={styles.infoValue}>+34 123 456 789</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Ubicación</span>
              <span className={styles.infoValue}>Madrid, España</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Experiencia</h2>
          <div className={styles.experienceItem}>
            <h3 className={styles.experienceTitle}>Desarrollador Frontend</h3>
            <p className={styles.experienceCompany}>Empresa XYZ • 2021 - Presente</p>
            <p className={styles.experienceDescription}>
              Desarrollo de aplicaciones web con React, TypeScript y Next.js
            </p>
          </div>
          <div className={styles.experienceItem}>
            <h3 className={styles.experienceTitle}>Desarrollador Junior</h3>
            <p className={styles.experienceCompany}>Startup ABC • 2019 - 2021</p>
            <p className={styles.experienceDescription}>
              Mantenimiento y desarrollo de features en aplicaciones legacy
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Habilidades</h2>
          <div className={styles.skills}>
            <span className={styles.skill}>React</span>
            <span className={styles.skill}>TypeScript</span>
            <span className={styles.skill}>Node.js</span>
            <span className={styles.skill}>CSS</span>
            <span className={styles.skill}>Git</span>
            <span className={styles.skill}>Next.js</span>
            <span className={styles.skill}>REST APIs</span>
            <span className={styles.skill}>SQL</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.editButton}>
            Editar Perfil
          </button>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}
