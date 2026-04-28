import { useId } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/AuthStore'

import styles from './CreateNewExperience.module.css'

export function ProfileForm () {
    
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
        <div className={styles.card}>
                <h2 className={styles.title}>Edit your profile</h2>
                <p className={styles.subtitle}>
                  Fill in the information you want to update
                </p>
        
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor={nameId} className={styles.label}>
                      Full Name
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      name={nameId}
                      className={styles.input}
                      defaultValue={user?.name}
                      placeholder="Your name"
                    />
                  </div>
        
                  <div className={styles.formGroup}>
                    <label htmlFor={phoneId} className={styles.label}>
                      Phone
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
                      Title
                    </label>
                    <input
                      id={titleId}
                      name={titleId}
                      type="text"
                      className={styles.input}
                      defaultValue={user?.title}
                      placeholder="Your professional title"
                    />
                  </div>
        
                  <div className={styles.formGroup}>
                    <label htmlFor={locationId} className={styles.label}>
                      Location
                    </label>
                    <input
                      id={locationId}
                      name={locationId}
                      type="text"
                      className={styles.input}
                      defaultValue={user?.location}
                      placeholder="Your location"
                    />
                  </div>
        
                  <div className={styles.formGroup}>
                    <label htmlFor={skillsId} className={styles.label}>
                      Skills
                    </label>
                    <input
                      id={skillsId}
                      name={skillsId}
                      type="text"
                      className={styles.input}
                      defaultValue={user?.skills?.join(', ')}
                      placeholder="Your skills"
                    />
                  </div>
                  <button type="submit" className={styles.submitButton}>
                    Update Profile
                  </button>
                </form>
              </div>
    );
}