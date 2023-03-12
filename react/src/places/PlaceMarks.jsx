import React from 'react'
import { delMark } from '../slices/placeMarkSlice.'
import { useDispatch } from 'react-redux';

// const PlaceMarks = ({ mark,handleDeleteMark}) => {

const PlaceMarks = ({ mark }) => {
  const dispatch=useDispatch();
  console.log(mark)
  return (

    <tr> 
      <td>{mark.name}</td>
      <td>{mark.description}</td>
      <td><a href={mark.ruta}>{mark.ruta}</a></td>

      <td><button onClick={()=>{dispatch(delMark(mark.id))}  }>🗑️</button></td>
      {/* <td><button onClick={()=>handleDeleteMark(mark.id)  }>🗑️</button></td> */}

    </tr>

  )
}

export default PlaceMarks
