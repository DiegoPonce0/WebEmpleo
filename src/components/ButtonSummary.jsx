import { useAuthStore } from "../store/AuthStore";
import { useAISummary } from "../hooks/useAI.jsx"
import { Streamdown } from 'streamdown'
import styles from './ButtonSummary.module.css'

export function AISummary ({ jobId }) {
  const {summary, loading, generateSummary} = useAISummary(jobId)

  const { isLoggedIn } = useAuthStore();

  if (summary) {
    return (
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>✨ Resumen generado por IA</h2>

        <div className={styles.sectionContent}>
          <Streamdown
            isAnimating={loading}
          >
            {summary}
          </Streamdown>
        </div>

      </section>
    )
  }

  return (
    isLoggedIn ?
    <button
      onClick={generateSummary}
      disabled={loading}
      className={styles.applyButton}
    >
      {loading ? 'Generando resumen...' : '✨ Generar resumen con IA'}
    </button> :
    <button disabled className={styles.applyButton}>Inicia sesión para generar resumen</button>
  )
}