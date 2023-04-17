import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useForm } from '../hooks/useForm';
import { setFilter } from '../slices/posts/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from "../userContext";

const PostsMenu = () => {
  let { usuariId } = useContext(UserContext);
  
  const dispatch = useDispatch();
  const { formState, onInputChange } = useForm({

    filtrar: "",

  });
  const { filter } = useSelector((state) => state.posts);
  return (
    <div className="menu">
      <Link className='click orange' to="/posts/add">Afegir Entrada</Link>
      <Link className='click gray' to="/posts/grid">Grid</Link>
      <Link className='click blue' to="/posts/list">Llista</Link>
      <Link className='click orange' to="/posts/marks">Marks</Link>

      <input type="text" name="filtrar" placeholder='Filtrar' onChange={onInputChange}></input>

      <button className="btn btn-primary" onClick={(e) => { dispatch(setFilter({ ...filter, body: formState.filtrar })) }}>Cerca</button>
      <button className="btn btn-primary" onClick={(e) => { dispatch(setFilter({ body: "", author: usuariId })) }}>Mis Publicacions</button>
      <button className="btn btn-primary" onClick={(e) => { dispatch(setFilter({ body: "", author: "" })) }}>Rentar Fiiltres</button>
    </div>
  )
}

export default PostsMenu
