import React from 'react'
import { useForm } from '../hooks/useForm';
// import { useDispatch, useSelector } from "react-redux";

const TodoAdd = ({handleNewToDo}) => {
    const { description, formState, onInputChange, onResetForm } = useForm({
        description: ""
    });
    //const { todos } = useSelector(state => state.todos)
   // console.log(todos)
    //const dispatch = useDispatch();

    const onFormSubmit = (event) => {
        event.preventDefault();
        console.log("Abans abans del dispatch");

        if (description.length <= 1) return;

        const newTodo = {
            id: new Date().getTime(),
            description: description,
            done: false
        };
    
        console.log("Abans del dispatch");
        handleNewToDo(newTodo)

      };
    
  

    return (
        <div >
            <h1 >Todo List</h1>
            <form  >
                <input
                    placeholder="Què farem avui?"
                    name="description"
                    value={description}
                    onChange={onInputChange}
                />
                <input
                    type="button"
                    onClick={onFormSubmit}
                    value="Add"
                />
            </form>
        </div>
    )
}
export default TodoAdd
