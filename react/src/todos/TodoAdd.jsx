import React from 'react'
import { useForm } from '../hooks/useForm';
 import { useDispatch } from "react-redux";
 import { addtodo } from "../slices/todoSlice";

const TodoAdd = () => {
    const { description, formState, onInputChange, onResetForm } = useForm({
        description: ""
    });
    //const { todos } = useSelector(state => state.todos)
    // console.log(todos)
    const dispatch = useDispatch();

    const onFormSubmit = (event) => {
        event.preventDefault();
        console.log("Abans abans del dispatch");

        if (description.length <= 1) return;

        const newTodo = {

            id: new Date().getTime(),

            description: description,

            done: false

        }

        //  onResetForm()

        //handle(newTodo)

        dispatch(addtodo(newTodo))
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
