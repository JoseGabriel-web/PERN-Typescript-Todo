import React, { Fragment } from 'react'
import { InputTodo } from './components/InputTodo'
import { ListTodos } from './components/ListTodos'

export const App: React.FC = () => {
  return (
    <Fragment>
      <div className='container'>
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  )
}
