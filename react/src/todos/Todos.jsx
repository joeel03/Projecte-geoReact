import React from 'react'
import Todo from './Todo';
import TodoAdd from './TodoAdd';
import { useReducer ,useEffect} from 'react';
import { useSelector } from "react-redux";
// import { todoReducer } from './todoReducer';
// const initialState = [];
// const init = () => {
//   return JSON.parse(localStorage.getItem("todos")) || []
// }

const Todos = () => {
  //const [todos, dispatchTodos] = useReducer(todoReducer, initialState, init);
  const { todos } = useSelector(state => state.todos)

  const dispatch = useDispatch();
  
  useEffect(() => {

    localStorage.setItem('todos', JSON.stringify(todos))

  }, [todos])
  // const handleNewToDo = (todo) => {
  //   dispatchTodos({

  //     type: 'Add Todo',

  //     payload: todo

  //   })}
  //   const handleDeleteToDo = (id) => {
  //     dispatchTodos({
  
  //       type: 'Del Todo',
  
  //       payload: id
  
  //     })}
  //     const handleToggleTodo = (id) => {
  //       dispatchTodos({
    
  //         type: 'Toggle Todo',
    
  //         payload: id
    
  //       })
  // }
  return (
    <div>
      <TodoAdd handleNewToDo={handleNewToDo}/>
     
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} handleDeleteTodo={handleDeleteToDo} handleToggleTodo={handleToggleTodo} />
      ))}

    </div>
  )
}

export default Todos
