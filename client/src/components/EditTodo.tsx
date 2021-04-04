import React, {  Fragment, useState } from 'react'

interface Todo {
  todo_id: number;
  description: string;
}

interface Props {
  todo: Todo
}

export const EditTodo: React.FC<Props> = ({ todo }) => {
  const [description, setDescription] = useState<string>(todo.description)

  const handleEditTodo = async (todo_id: number) => {
    try {
      const body = { description }
      await fetch(`http://localhost:4000/todos/${todo_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(body)
      })
      window.location.href = '/'      
    } catch(error) {
      console.error(error.message) 
    }
  }

  return (
    <Fragment>
      <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
        Edit
      </button>
      
      <div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>&times;</button>
            </div>

            <div className="modal-body">
              <input onChange={(e) => setDescription(e.target.value)} value={description} type='text' className='form-control' />
            </div>

            <div className="modal-footer">
              <button onClick={() => handleEditTodo(todo.todo_id)} type="button" className="btn btn-warning" data-dismiss="modal">Edit</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  )
}