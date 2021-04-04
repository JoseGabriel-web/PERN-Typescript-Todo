import React, { Fragment, useState, useEffect } from 'react'
import { EditTodo } from './EditTodo'

interface Props {}

interface Todo {
  todo_id: number;
  description: string
}

export const ListTodos: React.FC<Props> = () => {

  const [todos, setTodos] = useState<Todo[]>([])
  
  const getTodos = async () => {
    const response = await fetch("http://localhost:4000/todos")
    const data: Todo[] = await response.json()
    setTodos(data)
    console.log(data)
  }

  const handleDeleteTodo = async (todo_id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/todos/${todo_id}`, { method: 'DELETE' })
      setTodos(todos.filter(todo => todo.todo_id !== todo_id))
      console.log(response)
    } catch(error) {
      console.error(error.message)
    }    
  }

  useEffect(() => {
    getTodos()
  },[])
  
  return (
    <Fragment>      
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos && todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td><EditTodo todo={todo} /></td>
              <td><button className='btn btn-danger' onClick={() => handleDeleteTodo(todo.todo_id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}