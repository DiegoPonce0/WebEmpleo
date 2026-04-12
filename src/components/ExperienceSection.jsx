import { useState } from 'react'
import { AddExperience } from './AddExperience'
import { useAuthStore } from '../store/AuthStore'


export function ExperienceSection() {
  const user = useAuthStore(state => state.user)
  const [experiences, setExperiences] = useState(user?.experience || [])
  const handleAdd = (exp) => {
    setExperiences([exp, ...experiences])
  }

  const handleDelete = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/experiences/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })

    setExperiences(experiences.filter(e => e.id !== id))
  }

  return (
    <section>
      <h2>Experience</h2>

      <AddExperience onAdd={handleAdd} />

      {experiences.map(exp => (
        <div key={exp.id}>
          <h3>{exp.title} - {exp.company}</h3>
          <p>{exp.responsibilities}</p>

          <button onClick={() => handleDelete(exp.id)}>
            Delete
          </button>
        </div>
      ))}
    </section>
  )
}