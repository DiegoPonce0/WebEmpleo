import snarkdow from 'snarkdown'
import styles from './JobSection.module.css'

export function JobSection({ title, content }) {
    const html = snarkdow(content)

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
                {title}
            </h2>

            <div
                className={`${styles.sectionContent} prose`}
                dangerouslySetInnerHTML={{
                __html: html
                }}
            />

        </section>
    )
}
