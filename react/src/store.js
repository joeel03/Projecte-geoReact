import { configureStore } from '@reduxjs/toolkit'
import { placeMarkReducer } from './slices/placeMarkSlice.'
import { postMarkReducer } from './slices/postMarkSlice'
import { todosReducer } from './slices/todoSlice'

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        marks:placeMarkReducer,
        marks2:postMarkReducer
        },
    })
