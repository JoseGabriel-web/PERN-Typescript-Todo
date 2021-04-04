import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()
const Pool = pg.Pool;

const pool = new Pool({
  user: "postgres",
  password: process.env.DB_PASSWORD,
  host: "localhost",
  database: process.env.DB_NAME,
  port: 5432
})

export { pool };