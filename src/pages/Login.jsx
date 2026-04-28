import { useId, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/AuthStore'
import { useFavoriteStore } from '../store/FavoriteStore'
import styles from './Login.module.css'

export default function Login() {
  const login = useAuthStore(state => state.login)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const passwordId = useId()
  const emailId = useId()

  const handleSubmit = async (e) => {
      e.preventDefault()
      setError(null)

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
          throw new Error(data.error || 'Error trying to login')
        }

        login(data.user)
        await useFavoriteStore.getState().fetchFavorites()
        navigate('/profile')

      } catch (error) {
        setError(error.message)
      }
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>
          Access your account to apply for opportunities
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
              placeholder="your@email.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={passwordId} className={styles.label}>
              Password
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
            Login
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>

        <p className={styles.footer}>
          Don't have an account?{' '}
          <a href="/register" className={styles.link}>
            Register here
          </a>
        </p>
      </div>
    </main>
  )
}