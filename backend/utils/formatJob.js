export const formatJob = (job) => ({
  id: job.id,
  title: job.title,
  company: job.company,
  location: job.location,
  description: job.short_description,
  data: {
    technology: job.technology,
    modality: job.modality,
    level: job.level
  },
  content: {
    description: job.full_description,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    about: job.about
  }
})