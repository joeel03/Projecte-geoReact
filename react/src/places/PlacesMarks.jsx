import React from 'react'
import PlaceMarks from './PlaceMarks'
import { placeMarkReducer } from './placeMarkReducer';
import { useReducer } from 'react';
import { useEffect } from 'react';
const initialState = [];
const init = () => {
  return JSON.parse(localStorage.getItem("marks")) || []
  console.log(marks)
}

const PlacesMarks = () => {
  const [marks, dispatchMarks] = useReducer(placeMarkReducer, initialState, init);

  const handleDeleteMark = (id) => {
    dispatchMarks({

      type: 'Del Mark',

      payload: id

    })
  }
  console.log(marks)

  return (
    <div>
      <table>
        <tr>
          <th>nombre</th>
          <th>descripcion</th>
          <th>ruta</th>
          <th>botons</th>

        </tr>

        {marks.map((mark) => (
          <PlaceMarks key={mark.id} mark={mark} handleDeleteMark={handleDeleteMark} />
        ))}
      </table>

    </div>
  )
}

export default PlacesMarks
