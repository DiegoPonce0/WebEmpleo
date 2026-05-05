import styles from './CreateNewExperience.module.css'
import { useAuthStore } from '../store/AuthStore'

export function EditExperience (){
    

    const login = useAuthStore(state => state.login)
    const user = useAuthStore(state => state.user)


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
    
    return (
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
                      defaultValue={exp?.start_date ? new Date(exp.start_date).toLocaleDateString() : ''}
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
                      defaultValue={exp?.end_date ? new Date(exp.end_date).toLocaleDateString() : ''}
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
    )
}