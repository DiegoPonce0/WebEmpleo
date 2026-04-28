import pkg from 'pg'
import fs from 'fs/promises'
import 'dotenv/config';

const { Pool } = pkg

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

const locations = [
  'Remote',
  'Vancouver',
  'Toronto',
  'Calgary',
  'Alberta',
  'Montreal'
]

const getRandomLocation = () => {
  return locations[Math.floor(Math.random() * locations.length)]
}

async function seedJobs() {
  try {
    const data = await fs.readFile('./jobs.json', 'utf-8')
    const jobs = JSON.parse(data)

    for (const job of jobs) {

      const location = getRandomLocation()

      const title = job.title || 'Software Developer'
      const company = job.company || 'Tech Company'

      const short_description = job.description || ''
      const full_description = job.content?.description || ''

      const technology = job.data?.technology || []
      const modality = job.data?.modality || 'remote'
      const level = job.data?.level || 'junior'

      const responsibilities = job.content?.responsibilities || ''
      const requirements = job.content?.requirements || ''
      const about = job.content?.about || ''

      await pool.query(`
        INSERT INTO jobs (
          title,
          company,
          location,
          short_description,
          full_description,
          technology,
          modality,
          level,
          responsibilities,
          requirements,
          about
        )
        VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
        )
      `, [
        title,
        company,
        location,
        short_description,
        full_description,
        technology,
        modality,
        level,
        responsibilities,
        requirements,
        about
      ])
    }

    console.log('✅ Jobs insert correctly')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await pool.end()
  }
}

seedJobs()