import { ButtonApply } from './ButtonApply';
import { ButtonFavorite } from './ButtonFavorite';

import { Link } from 'react-router'
import styles from './JobCard.module.css'


export function JobCard({ job }) {
  return (
    <article 
      className="job-listing-card"
      data-modalidad={job.data.modalidad}
      data-nivel={job.data.nivel}
      data-technology={job.data.technology}
    >
        <div>
            <h3><Link className={styles.title} to={`/jobs/${job.id}`}>{job.titulo}</Link></h3>
            <small>{job.empresa} | {job.ubicacion}</small>
            <p className={styles.description}>{job.descripcion}</p>
        </div>
        <div className={styles.actions}>
        <Link to={`/jobs/${job.id}`} className={styles.details}>Ver Detalles</Link>
        <ButtonApply />
        <ButtonFavorite jobId={job.id} />
        </div>        
    </article>
  )

}