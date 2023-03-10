import React from 'react'
import { useSelector } from "react-redux";

const Todo = ({ todo, handleDeleteTodo, handleToggleTodo}) => {

    return (
        <div>
            <p>
                <span className={todo.done ? "tachar" : ""}>
                    {" "}
                    {todo.description}
                </span>
            </p>
            {todo.done ? (
                <button onClick={() => handleToggleTodo(todo.id)} >
                    Not Done
                </button>) : (
                <button onClick={() => handleToggleTodo(todo.id)}>
                    Done
                </button>
            )}
            <button onClick = {()=> dispatch(deltodo(todo.id))} > Remove </button> 
        </div>
    )
}

export default Todo
