import React from 'react'
import PostMarks from './PostMarks'
import { postMarkReducer } from './postMarkReducer';
import { useReducer } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { postMarkSlice } from '../slices/postMarkSlice';
/*
const initialState = [];
const init = () => {
  return JSON.parse(localStorage.getItem("marks2")) || []
  console.log(marks2)
}
*/

const PostsMarks = () => {
  const { marks2 } = useSelector(state => state.marks2)
  /*
  const [marks2, dispatchMarks] = useReducer(postMarkReducer, initialState, init);
    const handleDeleteMark = (id) => {
      dispatchMarks({
  
        type: 'Del Mark',
  
        payload: id
  
      })
    }
  */
  console.log(marks2)

  return (
    <div>
      <table>
        <tr>
          <th>body</th>
          <th>ruta</th>
          <th>botons</th>
        </tr>

        {marks2.map((mark) => (
          /*
          <PostMarks key={mark.id} mark={mark} handleDeleteMark={handleDeleteMark} />
*/
          <PostMarks key={mark.id} mark={mark}/>
        ))}
      </table>

    </div>
  )
}

export default PostsMarks
