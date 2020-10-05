import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './pages/Home';
import Cadastro from './pages/Cadastro';
import ListaUsuario from './pages/ListaUsuario';
import DetalheUsuario from './pages/DetalheUsuario';

export default function Routes() {

  return (
      <BrowserRouter>     
        <Switch>       
          <Route path="/" exact component={Menu} />
          <Route path="/cadastro" exact component={Cadastro} />
          <Route path="/listausuario" exact component={ListaUsuario} />             
          <Route path="/detalheusuario/:id" exact component={DetalheUsuario} />
        </Switch>
      </BrowserRouter>
  );
}
