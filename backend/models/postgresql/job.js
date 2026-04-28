import { DEFAULTS } from '../../config.js';

import pkg from 'pg';
import { formatJob } from '../../utils/formatJob.js';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


export class JobModel {
    static async getAll({ location, text, level, technology, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET }) {
        let query = `SELECT 
        id, 
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
        FROM jobs WHERE 1=1`

        const values = []
        let i = 1

        if (text) {
            query += ` AND (LOWER(title) LIKE $${i} OR LOWER(full_description) LIKE $${i})`
            values.push(`%${text.toLowerCase()}%`)
            i++
        }

        if (technology) {
            query += ` AND EXISTS (
            SELECT 1
            FROM unnest(technology) AS tech
            WHERE LOWER(tech) LIKE $${i})`  

            values.push(`%${technology.toLowerCase()}%`)
            i++
        }

        if (location) {
            query += ` AND (LOWER(location) LIKE $${i})`
            values.push(`%${location.toLowerCase()}%`)
            i++
        }

        if (level) {
            query += ` AND (LOWER(level) LIKE $${i})`
            values.push(`%${level.toLowerCase()}%`)
            i++
        }

        const countQuery = `SELECT COUNT(id) FROM (${query}) as total`
        const totalResult = await pool.query(countQuery, values)
        const total = Number(totalResult.rows[0].count)

        query += ` LIMIT $${i} OFFSET $${i + 1}`
        values.push(limit, offset)

        const result = await pool.query(query, values)

        const mappedJobs = result.rows.map(formatJob)

        return {total: total, data: mappedJobs};
    }
    
    static async getById(id) {
        const response = await pool.query(`SELECT 
        id, 
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
        FROM jobs WHERE id = $1`,
        [id]
      );

      const job = response.rows[0]

      if (!job) {
        return null
      }

      return formatJob(job)
    }


    static async create(job) {
       const { title, company, location, short_description, technology, modality, level, full_description, responsibilities, requirements, about } = job
       const response = await pool.query(
      `INSERT INTO jobs (
        title, 
        company, 
        location, 
        short_description, 
        technology, 
        modality, 
        level, 
        full_description, 
        responsibilities, 
        requirements, 
        about
        )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING  id, title, company, location, short_description, technology, modality, level, full_description, responsibilities, requirements, about`,
      [title, company, location, short_description, technology, modality, level, full_description, responsibilities, requirements, about]
    );

    return response.rows[0];
    }

  // Falta crear el modelo para que llame a la base de datos  static async update(id, { title, company, location, description, data }) {
    //     const jobIndex = jobs.findIndex(job => job.id === id);
    //     if (jobIndex === -1) {
    //         return null;
    //     }
    //     const updatedJob = {
    //         id,
    //         title,
    //         company,
    //         location,
    //         description,
    //         data
    //     };
    //     jobs[jobIndex] = updatedJob;
    //     return updatedJob;
    // }

    // static async patch(id, { title, company, location, description, data }) {
    //     const jobIndex = jobs.findIndex(job => job.id === id);
    //     if (jobIndex === -1) {
    //         return null;
    //     }
    //     const existingJob = jobs[jobIndex];
    //     const updatedJob = {
    //         id,
    //         title: title || existingJob.title,
    //         company: company || existingJob.company,
    //         location: location || existingJob.location,
    //         description: description || existingJob.description,
    //         data: data || existingJob.data
    //     };
    //     jobs[jobIndex] = updatedJob;
    //     return updatedJob;
    // }

    // static async delete(id) {
    //     const jobIndex = jobs.findIndex(job => job.id === id);
    //     if (jobIndex === -1) {
    //         return null;
    //     }
    //     const deletedJob = jobs.splice(jobIndex, 1)[0];
    //     return deletedJob;
    // }
}