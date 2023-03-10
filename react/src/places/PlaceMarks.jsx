import React from 'react'
import { delMark } from '../slices/placeMarkSlice.'

// const PlaceMarks = ({ mark,handleDeleteMark}) => {

const PlaceMarks = ({ mark }) => {
  console.log(mark)
  return (

    <tr> 
      <td>{mark.name}</td>
      <td>{mark.description}</td>
      <td><a href={mark.ruta}>{mark.ruta}</a></td>

      <td><button onClick={()=>delMark(mark.id)  }>🗑️</button></td>
      {/* <td><button onClick={()=>handleDeleteMark(mark.id)  }>🗑️</button></td> */}

    </tr>

  )
}

export default PlaceMarks
