import React from 'react';
import { Link } from 'react-router-dom';



function Menu() {

  return (

    <div className="container">
      <nav className="navbar navbar-light">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><Link to={`/cadastro`} className="nav-link">Cadastrar Usuarios</Link></li>
          <li className="nav-item"><Link to={`/listausuario`} className="nav-link">Listar Usuarios</Link></li>
        </ul>
      </nav>
    </div>);
}

export default Menu;