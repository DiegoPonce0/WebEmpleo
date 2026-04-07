import { useId, useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './Register.module.css'
import { useAuthStore } from '../store/AuthStore'

export default function Register() {
  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const [error, setError] = useState(null)

  const login = useAuthStore(state => state.login)
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.target)
    const name = formData.get(nameId)
    const email = formData.get(emailId)
    const password = formData.get(passwordId)

    try {
      const response = await fetch (`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()
      
      if (!response.ok) {
        const firstError = data.details?.[0]?.message || data.error

        setError(firstError)
        return
      }

      login(data.user)
      navigate('/profile')

    } catch (error) {
      
      setError(error || 'Error al registrar usuario')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crear Cuenta</h1>
        <p className={styles.subtitle}>
          Regístrate para aplicar a ofertas de trabajo
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Nombre completo
            </label>
            <input
              id={nameId}
              name={nameId}
              type="text"
              className={styles.input}
              placeholder="Juan Pérez"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor={emailId} className={styles.label}>
              Email
            </label>
            <input
              id={emailId}
              name={emailId}
              type="email"
              className={styles.input}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
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
            Crear Cuenta
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>

        <p className={styles.footer}>
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className={styles.link}>
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  )
}
