import { useId } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/AuthStore'
import { useState } from 'react'
import styles from './EditProfile.module.css'

export default function UpdateProfile() {
  const login = useAuthStore(state => state.login)
  const user = useAuthStore(state => state.user)

  const [showNewForm, setShowNewForm] = useState(false);

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

  const handleUpdateExperience = async (e, id) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const updateData = {
      title: formData.get('title'),
      company: formData.get('company'),
      start_date: formData.get('start_date'),
      end_date: formData.get('end_date'),
      responsibilities: formData.get('responsibilities')
    }

    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/experiences/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(updateData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error trying to update experience')
      }

      const updatedExperience = user.experience.map(exp => exp.id === id ? data.experience : exp)

      login({ ...user, experience: updatedExperience })

    } catch (error) {
        console.error(error)
    }
  }

  const handleDeleteExperience = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/experiences/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error trying to delete experience')
      }

      const updatedExperience = user.experience.filter(exp => exp.id !== id)

      login({ ...user, experience: updatedExperience })

    } catch (error) {
      console.error(error)
    }
  }

  const handleCreateExperience = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const newExperience = {
      title: formData.get('title'),
      company: formData.get('company'),
      start_date: formData.get('start_date'),
      end_date: formData.get('end_date'),
      responsibilities: formData.get('responsibilities')
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/experiences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newExperience)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }
      const updatedExperience = [...user.experience, data.experience]
      login({...user, experience: updatedExperience})

      setShowNewForm(false) // ✅ cerrar form

    } catch (err) {
      console.error(err)
    }
}

  return (
    <main className={styles.container}>
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
      
      <div className={styles.card}>
        <h2 className={styles.title}>Job Experience</h2>
        <p className={styles.subtitle}>
          Fill in the information about your job experience, add as many as you want and show them on your profile
        </p>

        {user?.experience?.map((exp, index) => (
        <form className={styles.form} key={exp.id ||index} onSubmit={(e) => handleUpdateExperience(e, exp.id)}>
          <div className={styles.formGroup}>
            <label htmlFor={`title-${index}`} className={styles.label}>
              Title
            </label>
            <input
              id={`title-${index}`}
              name="title"
              type="text"
              className={styles.input}
              defaultValue={exp?.title}
              placeholder="Your job title"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={`company-${index}`} className={styles.label}>
              Company
            </label>
            <input
              id={`company-${index}`}
              name="company"
              type="text"
              className={styles.input}
              defaultValue={exp?.company}
              placeholder="Company name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={`startDate-${index}`} className={styles.label}>
              Start Date
            </label>
            <input
              id={`startDate-${index}`}
              name="start_date"
              type="text"
              className={styles.input}
              defaultValue={exp?.start_date}
              placeholder="DD/MM/YYYY"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={`endDate-${index}`} className={styles.label}>
              End Date
            </label>
            <input
              id={`endDate-${index}`}
              name="end_date"
              type="text"
              className={styles.input}
              defaultValue={exp?.end_date}
              placeholder="DD/MM/YYYY"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={`responsibilities-${index}`} className={styles.label}>
              Responsibilities
            </label>
            <textarea
              id={`responsibilities-${index}`}
              name="responsibilities"
              className={styles.input}
              defaultValue={exp?.responsibilities}
              placeholder="Describe your responsibilities and achievements in this job"
            />
          </div>
          <div className={styles.actionGroup}>
            <button type="submit" className={styles.submitButton}>
              Update Experience
            </button>
            <button type="button" className={styles.deleteButton} onClick={() => handleDeleteExperience(exp.id)}>
              Delete Experience
            </button>
          </div>
        </form>
        ))}
      </div>

      {!showNewForm && (
        <button 
          className={styles.addButton} 
          onClick={() => setShowNewForm(true)}
        >
          + Add New Experience
        </button>
    )}

      {showNewForm && (
      <div className={styles.card}>
        <form className={styles.form} onSubmit={handleCreateExperience}> 
          <h3>New Experience</h3>
          <div className={styles.formGroup}>
            <label htmlFor="new-title">
              Title
            </label>
            <input 
              id="new-title" 
              name="title" 
              type="text" 
              className={styles.input}
              placeholder="Job Title" 
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="new-company">
              Company
            </label>
            <input 
              id="new-company" 
              name="company" 
              type="text" 
              className={styles.input}
              placeholder="Company Name" 
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="new-start-date">
              Start Date
            </label>
            <input 
              id="new-start-date" 
              name="start_date" 
              type="text" 
              className={styles.input}
              placeholder="DD/MM/YYYY" 
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="new-end-date">
              End Date
            </label>
            <input 
              id="new-end-date" 
              name="end_date" 
              type="text" 
              className={styles.input}
              placeholder="DD/MM/YYYY" 
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="new-responsibilities">
              Responsibilities
            </label>
            <textarea 
              id="new-responsibilities" 
              name="responsibilities"
              className={styles.input} 
              placeholder="Describe your responsibilities and achievements in this job"
            />
          </div>

          <div className={styles.actionGroup}>
            <button type="submit" className={styles.submitButton}>
              Create Experience
            </button>
            <button 
              type="button" 
              className={styles.deleteButton}
              onClick={() => setShowNewForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      )}

    </main>
  )
}