import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    todos: JSON.parse(localStorage.getItem("todos")) || []

}

export const todosSlice = createSlice({

    name: 'todos',

    initialState,

    reducers: {

        addtodo: (state, action) => {

            state.todos.push(action.payload) // aqui podem fer push
            
        },

        deltodo: (state, action) => {

            state.todos = state.todos.filter(todo => todo.id !== action.payload)

        },

        toggletodo: (state, action) => {

            state.todos = state.todos.map((todo) => {

                if (todo.id === action.payload) { //id

                    return { ...todo, done: !todo.done } // invertim el done

                }

                return todo

            })

        }

    }

});

export const { addtodo, deltodo, toggletodo } = todosSlice.actions;

export const todosReducer = todosSlice.reducer 