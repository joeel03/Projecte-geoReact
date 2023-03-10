import React from 'react'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { deltodo,toggletodo } from '../slices/todoSlice';
const Todo = ({ todo }) => {
    const dispatch = useDispatch();

    return (
        <div>
            <p>
                <span className={todo.done ? "tachar" : ""}>
                    {" "}
                    {todo.description}
                </span>
            </p>
            {todo.done ? (
                // <button onClick={() => handleToggleTodo(todo.id)} >
                //     Not Done
                // </button>) 
                    <button onClick={() => dispatch(toggletodo(todo.id))} >
                    Not Done
                </button>)
                : (
                // <button onClick={() => handleToggleTodo(todo.id)}>
                //     Done
                // </button>
                 <button onClick={() => dispatch(toggletodo(todo.id))}>
                 Done
             </button>
            )}
            <button onClick = {()=> dispatch(deltodo(todo.id))} > Remove </button> 
        </div>
    )
}

export default Todo
