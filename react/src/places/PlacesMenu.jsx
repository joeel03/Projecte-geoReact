import React from 'react'
import { Link } from 'react-router-dom';

const PlacesMenu = () => {
  return (
    <div class="menu">
       <Link className='click blue' to="/places/add">Afegir Entrada</Link>
       <Link className='click orange' to="/places/grid">Grid</Link>
       <Link className='click gray' to="/places/list">Llista</Link>


    </div>
  )
}

export default PlacesMenu
