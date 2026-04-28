import { formatJob } from '../../utils/formatJob.js';

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export class FavoriteModel {
    static async getAll(user_id) {
       const response = await pool.query(`SELECT 
        j.id,
        j.title,
        j.company,
        j.location,
        j.short_description,
        j.full_description,
        j.technology,
        j.modality,
        j.level,
        j.responsibilities,
        j.requirements,
        j.about
        FROM favorites f
        JOIN jobs j ON f.job_id = j.id
        WHERE f.user_id = $1`,
        [user_id]
      );

        const favorites = response.rows

        if(favorites.length === 0) {
            return [];
        }

        return favorites.map(formatJob);

    }
    
    static async addFavorite(job_id, user_id) {
        const response = await pool.query(`
          INSERT INTO favorites  
          (job_id, user_id) 
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING
          RETURNING job_id, user_id`,
          [job_id, user_id]
      );

      return response.rows
    } 

    static async removeFavorite(user_id, job_id) {
       const response = await pool.query(
        `DELETE FROM favorites WHERE user_id = $1 and job_id = $2 RETURNING user_id`,
        [user_id, job_id]
      );

      return response.rows[0];
    }

}