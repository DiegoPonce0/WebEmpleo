
import styles from './FavoriteJobs.module.css'

export default function FavoriteJobs() {
  

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Favorite Jobs</h1>
        <p className={styles.subtitle}>
          Latest jobs you have saved will appear here. You can track the status of your applications and manage your job search effectively.
        </p>

      </div>
    </main>
  )
}