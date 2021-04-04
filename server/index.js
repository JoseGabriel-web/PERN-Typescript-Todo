import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { pool } from "./db.js"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())


// GET ALL TODOS
app.get("/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo")
    res.json(todos.rows)
  } catch (error) {
    console.error(error.message)
  }
})

// GET A TODO BY ID
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
    res.json(todo.rows)
  } catch (error) {
    console.error(error.message)
  }
})

// CREATE A TODO
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    )
    res.json(newTodo.rows)
  } catch (error) {
    console.error(error.message)
  }
})

// UPDATE TODO
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body
    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    )
    res.json("Todo was updated")
  } catch (error) {
    console.error(error.message)
  }
})

// DELETE TODO
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ])
    res.json("Todo deleted")
  } catch (error) {
    console.error(error.message)
  }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`App Running On Port ${PORT}`))