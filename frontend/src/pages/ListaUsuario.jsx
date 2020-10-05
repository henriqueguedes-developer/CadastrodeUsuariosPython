import React, { Component } from 'react';
import Home from './Home';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default class ListaUsuario extends Component {

  state = {
    listas: []
  };

  async componentDidMount() {
    const response = await api.get('/');

    this.setState({
      listas: response.data
    });

  };

  render() {
    const { listas } = this.state;
    return (
      <>
        <Home />
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">E-mail</th>
                <th scope="col">Celular</th>
                <th scope="col">Detalhes</th>
              </tr>
            </thead>
            <tbody>

              {listas.map(lista => (
                <tr key={lista.id}>
                  <th scope="row">#</th>
                  <td>{lista.id}</td>
                  <td>{lista.nome}</td>
                  <td>{lista.email}</td>
                  <td>{lista.celular}</td>
                  <td><Link to={`/detalheusuario/${lista.id}`}>Detalhes</Link></td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </>
    );
  }
}