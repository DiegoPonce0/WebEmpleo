import { ButtonApply } from './ButtonApply';
import { ButtonFavorite } from './ButtonFavorite';

import { Link } from 'react-router'
import styles from './JobCard.module.css'


export function JobCard({ job }) {
  return (
    <article 
      className="job-listing-card"
      data-modality={job.data.modality}
      data-level={job.data.level}
      data-technology={job.data.technology}
    >
        <div>
            <h3><Link className={styles.title} to={`/jobs/${job.id}`}>{job.title}</Link></h3>
            <small>{job.company} | {job.location}</small>
            <p className={styles.description}>{job.description}</p>
        </div>
        <div className={styles.actions}>
        <Link to={`/jobs/${job.id}`} className={styles.details}>View Job</Link>
        <ButtonApply />
        <ButtonFavorite jobId={job.id} />
        </div>        
    </article>
  )

}