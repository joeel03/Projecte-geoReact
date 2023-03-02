import React from 'react'
const initialState = [];
const init = ()=> {
  return JSON.parse(localStorage.getItem("todos")) || []
}

const Todos = () => {
  const [todos, dispatchTodos] = useReducer(todosReducer, initialState,init);
  
  const addTodo=(todo)=>{
    dispatchTodos({ type: 'Add Todo', payload: todo }) 

  }
  const delTodo=(id)=>{
    dispatchTodos({ type: 'Del Todo', payload: id })
  }
  const toggleTodo=(id)=>{
    dispatchTodos({

      type: 'Toggle Todo',
      
      payload: id
      
      }) 
  }
  return (
    <div>
      
    </div>
  )
}

export default Todos
