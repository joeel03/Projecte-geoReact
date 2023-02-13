import React from 'react'
import { Link } from 'react-router-dom';

const PostsMenu = () => {
  return (
    <div className="menu">
       <Link className='click orange' to="/posts/add">Afegir Entrada</Link>
       <Link className='click gray' to="/posts/grid">Grid</Link>
       <Link className='click blue' to="/posts/list">Llista</Link>
    </div>
  )
}

export default PostsMenu
