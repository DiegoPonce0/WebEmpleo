import { useId } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/AuthStore'
import styles from './EditProfile.module.css'

export default function UpdateProfile() {
  const login = useAuthStore(state => state.login)
  const user = useAuthStore(state => state.user)




  const navigate = useNavigate()
  const nameId = useId()
  const phoneId = useId()
  const titleId = useId()
  const locationId = useId()
  const skillsId = useId()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const name = formData.get(nameId)
    const phone = formData.get(phoneId)
    const title = formData.get(titleId)
    const location = formData.get(locationId)
    const skills = formData.get(skillsId)

    const skillsArray = skills
      ? skills.split(',').map(s => s.trim())
      : []

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name, phone, title, location, skills: skillsArray })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al actualizar perfil')
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
        <h1 className={styles.title}>Editar informacion del perfil</h1>
        <p className={styles.subtitle}>
          Llena la informacion que deseas actualizar
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor={nameId} className={styles.label}>
              Nombre
            </label>
            <input
              id={nameId}
              type="text"
              name={nameId}
              className={styles.input}
              defaultValue={user?.name}
              placeholder="Tu nombre"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={phoneId} className={styles.label}>
              Telefono
            </label>
            <input
              id={phoneId}
              name={phoneId}
              type="text"
              className={styles.input}
              defaultValue={user?.phone}
              placeholder="55 - 5555 - 5555"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={titleId} className={styles.label}>
              Titulo
            </label>
            <input
              id={titleId}
              name={titleId}
              type="text"
              className={styles.input}
              defaultValue={user?.title}
              placeholder="Tu titulo profesional"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={locationId} className={styles.label}>
              Ubicación
            </label>
            <input
              id={locationId}
              name={locationId}
              type="text"
              className={styles.input}
              defaultValue={user?.location}
              placeholder="Tu ubicación"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={skillsId} className={styles.label}>
              Habilidades
            </label>
            <input
              id={skillsId}
              name={skillsId}
              type="text"
              className={styles.input}
              defaultValue={user?.skills?.join(', ')}
              placeholder="Tus habilidades"
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Actualizar perfil
          </button>
        </form>
      </div>
    </div>
  )
}