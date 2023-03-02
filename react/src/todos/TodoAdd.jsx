import React from 'react'

const TodoAdd = () => {

    const newTodo = {
        id: new Date().getTime(),
        description: description,
        done: false
    };

    onResetForm();
    dispatch(addtodo(newTodo));

    return (
        <div>

        </div>
    )
}

export default TodoAdd
