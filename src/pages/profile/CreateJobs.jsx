import { useId } from 'react'
import styles from './CreateJobs.module.css'

export default function CreateJobs() {
  
  const titleId = useId()
  const companyId = useId()
  const locationId = useId()
  const descriptionId = useId()
  const technologyId = useId()
  const modalityId = useId()
  const levelId = useId()
  const responsibilitiesId = useId()
  const requirementsId = useId()
  const aboutId = useId()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const title = formData.get(titleId)
    const company = formData.get(companyId)
    const location = formData.get(locationId)
    const description = formData.get(descriptionId)

    const data = {
      technology: formData.get(technologyId)?.split(',').map(t => t.trim()),
      modality: formData.get(modalityId),
      level: formData.get(levelId)
    }

    const content = {
      responsibilities: formData.get(responsibilitiesId),
      requirements: formData.get(requirementsId),
      about: formData.get(aboutId)
    }

    const jobData = {
      title,
      company,
      location,
      description,
      data,
      content
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      })

      if (!response.ok) {
        throw new Error('Failed to create job')
      }

      const result = await response.json()
      console.log('Job created successfully:', result)
      
    } catch (error){
      console.error('Error creating job:', error)
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create Jobs</h1>
        <p className={styles.subtitle}>
          Fill out the form below to create a new job listing.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor={titleId} className={styles.label}>
              Job Title
            </label>
            <input
              id={titleId}
              name={titleId}
              type="text"
              className={styles.input}
              placeholder="Job title"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={companyId} className={styles.label}>
              Company
            </label>
            <input
              id={companyId}
              name={companyId}
              type="text"
              className={styles.input}
              placeholder="Company name"
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
              placeholder="Location"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={descriptionId} className={styles.label}>
              Description
            </label>
            <textarea
              id={descriptionId}
              name={descriptionId}
              className={styles.input}
              placeholder="Job description"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={technologyId} className={styles.label}>
              Technology
            </label>
            <input
              id={technologyId}
              name={technologyId}
              type="text"
              className={styles.input}
              placeholder="node, react, etc"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={modalityId} className={styles.label}>
              Modality
            </label>
            <select 
            id={modalityId} 
            name={modalityId} 
            className={styles.input}
            >
              <option value="">Select modalidad</option>
              <option value="remote">Remote</option>
              <option value="in person">In Person</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={levelId} className={styles.label}>
              Level
            </label>
            <select 
            id={levelId} 
            name={levelId} 
            className={styles.input}
            >
              <option value="">Select Level</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={responsibilitiesId} className={styles.label}>
              Responsibilities
            </label>
            <input 
            id={responsibilitiesId} 
            name={responsibilitiesId} 
            type="text"
            className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={requirementsId} className={styles.label}>
              Requirements
            </label>
            <input 
            id={requirementsId} 
            name={requirementsId} 
            type="text"
            className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={aboutId} className={styles.label}>
              About
            </label>
            <input 
            id={aboutId} 
            name={aboutId} 
            type="text"
            className={styles.input}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Create Job
          </button>
        </form>

      </div>
    </main>
  )
}
