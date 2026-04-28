
import styles from './AppliedJobs.module.css'

export default function AppliedJobs() {
  

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Applied Jobs</h1>
        <p className={styles.subtitle}>
          Latest jobs you have applied to will appear here. You can track the status of your applications and manage your job search effectively.
        </p>

      </div>
    </main>
  )
}