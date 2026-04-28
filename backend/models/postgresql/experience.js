import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export class ExperienceModel {
  static async createExperience(experience) {
    const { user_id, title, company, start_date, end_date, responsibilities } = experience;

    const res = await pool.query(
      `INSERT INTO experiences (user_id, title, company, start_date, end_date, responsibilities)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, title, company, start_date, end_date, responsibilities`,
      [user_id, title, company, start_date, end_date, responsibilities]
    );

    return res.rows[0];
  }

  static async updateExperience(experience) {
    const { id, user_id, title, company, start_date, end_date, responsibilities } = experience;

    const res = await pool.query(
      `UPDATE experiences
       SET title = $3, company = $4, start_date = $5, end_date = $6, responsibilities = $7
       WHERE id = $1 AND user_id = $2
       RETURNING id, title, company, start_date, end_date, responsibilities`,
      [id, user_id, title, company, start_date, end_date, responsibilities]
    );

    return res.rows[0];
  }

  static async deleteExperience(user_id, id) {
    const res = await pool.query(
      `DELETE FROM experiences WHERE user_id = $1 and id = $2 RETURNING id`,
      [user_id, id]
    );

    return res.rows[0];
  }


}