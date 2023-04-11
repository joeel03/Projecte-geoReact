import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect,useContext } from 'react';
import { useForm } from '../hooks/useForm';
import { setFilter } from '../slices/places/placeSlice';
import { useDispatch } from 'react-redux';
import { UserContext } from "../userContext";

const PlacesMenu = () => {
let { usuari } = useContext(UserContext);
const dispatch= useDispatch();
   const { formState, onInputChange } = useForm({

    filtrar: "",

   });
   const { filtrar } = formState
  return (
    <div className="menu">
       <Link className='click blue' to="/places/add">Afegir Entrada</Link>
       <Link className='click orange' to="/places/grid">Grid</Link>
       <Link className='click gray' to="/places/list">Llista</Link>
       <Link className='click gray' to="/places/marks">Marks</Link>
       
       <input type="text" name="filtrar" placeholder='filtrar por descripcion' onChange={onInputChange}></input>
       <button className="btn btn-primary" onClick={(e) => {dispatch(setFilter({...filtrar,description:formState.filtrar}))}}>Find</button>
       
    </div>
  )
}

export default PlacesMenu
