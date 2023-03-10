import { configureStore } from '@reduxjs/toolkit'
import { todoReducer } from './todos/todoReducer'
export const store = configureStore({
    reducer: {
        todos: todoReducer
        },
    })
