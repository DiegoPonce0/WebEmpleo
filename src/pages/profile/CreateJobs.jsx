import { useId } from 'react'

import styles from './CreateJobs.module.css'

export default function CreateJobs() {
  
  const titleId = useId()
  const companyId = useId()
  const locationId = useId()
  const descriptionId = useId()
  const dataId = useId()
  const contentId = useId()

  const handleSubmit = async (e) => {
    e.preventDefault()
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
              type="text"
              name={titleId}
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
            <label htmlFor={dataId} className={styles.label}>
              Job Data
            </label>
            <input
              id={dataId}
              name={dataId}
              type="text"
              className={styles.input}
              placeholder="Job data"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={contentId} className={styles.label}>
              Job Content
            </label>
            <textarea
              id={contentId}
              name={contentId}
              className={styles.input}
              placeholder="Job content"
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
