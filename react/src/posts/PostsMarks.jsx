import React from 'react'
import PostMarks from './PostMarks'
import { postMarkReducer } from './postMarkReducer';
import { useReducer } from 'react';
import { useEffect } from 'react';
const initialState = [];
const init = () => {
  return JSON.parse(localStorage.getItem("marks2")) || []
  console.log(marks2)
}

const PostsMarks = () => {
  const [marks2, dispatchMarks] = useReducer(postMarkReducer, initialState, init);

  const handleDeleteMark = (id) => {
    dispatchMarks({

      type: 'Del Mark',

      payload: id

    })
  }
  console.log(marks2)

  return (
    <div>
      <table>
        <tr>
          <th>nombre</th>
          <th>descripcion</th>
          <th>ruta</th>
          <th>botons</th>

        </tr>

        {marks2.map((mark) => (
          <PostMarks key={mark.id} mark={mark} handleDeleteMark={handleDeleteMark} />
        ))}
      </table>

    </div>
  )
}

export default PostsMarks
