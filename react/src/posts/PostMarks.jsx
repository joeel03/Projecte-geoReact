import React from 'react'
import { delMark } from '../slices/postMarkSlice'
import { useDispatch } from 'react-redux'


//const PostMarks = ({ mark,handleDeleteMark}) => {

const PostMarks = ({ mark }) => {
  const dispatch=useDispatch();
  console.log(mark)
  return (
    <tr>
      <td>{mark.body}</td>
      <td><a href={mark.ruta}>{mark.ruta}</a></td>

      <td><button onClick={()=>{dispatch(delMark(mark.id))}  }>🗑️</button></td>
      {/*<td><button onClick={() => handleDeleteMark(mark.id)}>🗑️</button></td>*/}
    </tr>

  )
}

export default PostMarks
