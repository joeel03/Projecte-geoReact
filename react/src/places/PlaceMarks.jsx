import React from 'react'


const PlaceMarks = ({ mark,handleDeleteMark}) => {
  return (

    <tr> 
      <td>{mark.name}</td>
      <td>{mark.description}</td>
      <td><a href={mark.ruta}>{mark.ruta}</a></td>

      <td><button onClick={()=>handleDeleteMark(mark.id)  }>🗑️</button></td>
    </tr>

  )
}

export default PlaceMarks
