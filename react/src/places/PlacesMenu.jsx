import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PlacesMenu = () => {

  return (
    <div className="menu">
       <Link className='click blue' to="/places/add">Afegir Entrada</Link>
       <Link className='click orange' to="/places/grid">Grid</Link>
       <Link className='click gray' to="/places/list">Llista</Link>
    </div>
  )
}

export default PlacesMenu
