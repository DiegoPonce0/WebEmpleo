export function InfoCard({ title, description, children }) {
    return (
        <article>
            {children}
            <h3>{title}</h3>
            <p>{description}</p>
        </article>
    )
}