import { JobCard } from './JobCard.jsx'

export function JobListings({ jobs }) {
    return (
        <div className="jobs-listings">
            {jobs.map ((job) => (<JobCard key={job.id} job={job} />))}
        </div>
    )
}