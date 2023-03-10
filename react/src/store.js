import { configureStore } from '@reduxjs/toolkit'
import { todosReducer } from './slices/todoSlice'
export const store = configureStore({
    reducer: {
        todos: todosReducer
        },
    })
