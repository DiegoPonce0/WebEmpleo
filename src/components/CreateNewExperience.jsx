import { useState } from 'react'
import { useAuthStore } from '../store/AuthStore'

import styles from './CreateNewExperience.module.css'

export function CreateNewExperience() {

    const login = useAuthStore(state => state.login)
    const user = useAuthStore(state => state.user)
    const [showNewForm, setShowNewForm] = useState(false);
    
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
      const updatedExperience = [...(user.experience || []), data.experience]
      login({...user, experience: updatedExperience})

      setShowNewForm(false) 

    } catch (err) {
      console.error(err)
    }
}

return (

    <>
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
    </>
  )
}