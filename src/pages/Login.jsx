import { useId } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/AuthStore'
import styles from './Login.module.css'

export default function Login() {
  const login = useAuthStore(state => state.login)
  

  const navigate = useNavigate()
  const passwordId = useId()
  const emailId = useId()

  const handleSubmit = async (e) => {
      e.preventDefault()

      const formData = new FormData(e.target)
      const email = formData.get(emailId)
      const password = formData.get(passwordId)

      try {
        const response = await fetch (`${import.meta.env.VITE_API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ email, password })
        })

        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Error al registrar usuario')
        }

        login(data.user)
        navigate('/profile')

      } catch (error) {
        console.error(error)
      }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        <p className={styles.subtitle}>
          Accede a tu cuenta para aplicar a ofertas
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor={emailId} className={styles.label}>
              Email
            </label>
            <input
              id={emailId}
              type="email"
              name={emailId}
              className={styles.input}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={passwordId} className={styles.label}>
              Contraseña
            </label>
            <input
              id={passwordId}
              name={passwordId}
              type="password"
              className={styles.input}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Iniciar Sesión
          </button>
        </form>

        <p className={styles.footer}>
          ¿No tienes cuenta?{' '}
          <a href="/register" className={styles.link}>
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  )
}