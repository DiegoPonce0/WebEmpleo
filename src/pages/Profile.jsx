import { useAuthStore } from '../store/AuthStore.js'
import { Link } from '../components/Link.jsx'

import styles from './Profile.module.css'

export default function Profile() {
  const logout = useAuthStore(state => state.logout)
  const user = useAuthStore(state => state.user)

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
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
    <main>
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
          <h1 className={styles.name}>{user?.title}</h1>
          <p className={styles.email}>{user?.email}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Información Personal</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Nombre completo</span>
              <span className={styles.infoValue}>{user?.name}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>{user?.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Teléfono</span>
              <span className={styles.infoValue}>{user?.phone}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Ubicación</span>
              <span className={styles.infoValue}>{user?.location}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Experiencia</h2>
          {user?.experience && user.experience.length > 0 ? (
            user.experience.map((exp, index) => (
              <div key={index} className={styles.experienceItem}>
                <h3 className={styles.experienceTitle}>{exp.title}</h3>
                <p className={styles.experienceCompany}>
                  {exp.company} • {new Date(exp.start_date).toLocaleDateString()} - {new Date(exp.end_date).toLocaleDateString() || 'Presente'}
                </p>
                <p className={styles.experienceDescription}>
                  {exp.responsibilities}
                </p>
              </div>
            ))
          ) : (
            <p className={styles.noExperience}>No hay experiencia registrada.</p>
          )}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Habilidades</h2>
          <div className={styles.skills}>
            {user?.skills?.map((skill, index) => (
              <span key={index} className={styles.skill}>
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <Link className={styles.editButton} to="/profile/edit">
            Editar Perfil
          </Link>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </main>
  )
}
