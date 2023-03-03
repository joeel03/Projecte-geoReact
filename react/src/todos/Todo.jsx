import React from 'react'
import { useSelector } from "react-redux";

const Todo = ({ todo, handleDeleteToDo, handleToggleTodo}) => {
      //const { todos } = useSelector(state => state.todos)

    return (
        <div>
            <p>
                <span className={todo.done ? "line-through" : ""}>
                    {" "}
                    {todo.description}
                </span>
            </p>
            {todo.done ? (
                <button onClick={() => handleToggleTodo(todo.id)}>
                    Not Done
                </button>) : (
                <button onClick={() => handleToggleTodo(todo.id)}>
                    Done
                </button>
            )}
            {<button onClick={() => handleDeleteTodo(todo.id)}>
                Remove
            </button>}
        </div>
    )
}

export default Todo
