import React, { Fragment, useState } from 'react'

interface Props {

}

interface Body {
  description: String;
}

export const InputTodo: React.FC<Props> = () => {
  const [description, setDescription] = useState<string>('')

  const handleOnSumbit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()

    try {
      const body: Body = { description }
      await fetch("http://localhost:4000/todos", 
      { method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })      
      window.location.href = '/'   
    } catch(error) {
      console.error(error.message)
    }

  }

  return (
    <Fragment>
      <h1 className='text-center my-5'>Input Todo</h1>
      <form className='d-flex' onSubmit={e => handleOnSumbit(e)}>
        <input 
          type='text' 
          placeholder='Add todo...' 
          className='form-control' 
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className='btn btn-success'>Add</button>
      </form>
    </Fragment>
  )
}