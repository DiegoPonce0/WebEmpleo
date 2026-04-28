import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export class UserModel {
  static async createUser(user) {
    const { id, name, email, password } = user;

    const res = await pool.query(
      `INSERT INTO users (id, name, email, password)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email`,
      [id, name, email, password]
    );

    return res.rows[0];
  }

  static async findByEmail(email) {
    const res = await pool.query(
      `SELECT 
       id,
       name,
       email, 
       phone,
       title,
       location,
       skills,
       role,
       password FROM users WHERE email = $1`,
      [email]
    );

    const user = res.rows[0];
    if (user) {
      const experienceRes = await pool.query(
        `SELECT id, title, company, start_date, end_date, responsibilities FROM experiences WHERE user_id = $1`,
        [user.id]
      );
      user.experience = experienceRes.rows;
    }

    return user;
  }

  static async findById(id) {
    const res = await pool.query(
      `SELECT 
        id,
        name,
        email,
        phone,
        title,
        location,
        skills,
        role
      FROM users
      WHERE id = $1`,
      [id]
    );

    const user = res.rows[0];
    if (user) {
      const experienceRes = await pool.query(
        `SELECT id, title, company, start_date, end_date, responsibilities FROM experiences WHERE user_id = $1`,
        [id]
      );
      user.experience = experienceRes.rows;
    }

    return user;
  }

  static async updateProfile({ id, name, phone, title, location, skills }) {
    const res = await pool.query(
      `UPDATE users SET
        name = $1,
        phone = $2,
        title = $3,
        location = $4,
        skills = $5
      WHERE id = $6
      RETURNING id, name, email, phone, title, location, skills`,
      [name, phone, title, location, skills, id]
    );

    const user = res.rows[0];
    if (user) {
      const experienceRes = await pool.query(
        `SELECT title, company, start_date, end_date, responsibilities FROM experiences WHERE user_id = $1`,
        [id]
      );
      user.experience = experienceRes.rows;
    }

    return user;
  }
};