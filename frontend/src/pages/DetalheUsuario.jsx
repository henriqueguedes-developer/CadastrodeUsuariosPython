import React, { Component } from 'react';
import Home from './Home';
import api from '../services/api';


export default class DetalheUsuario extends Component {

  state = {
    listas: []
  };

  async componentDidMount() {
    let id = this.props.location.pathname.split('/').pop();
    const response = await api.get(`/${id}`);

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
                <th scope="col">Logradouro</th>
                <th scope="col">Cep</th>
                <th scope="col">Bairro</th>
                <th scope="col">Localidade</th>
                <th scope="col">UF</th>
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
                  <td>{lista.logradouro}</td>
                  <td>{lista.cep}</td>
                  <td>{lista.bairro}</td>
                  <td>{lista.localidade}</td>
                  <td>{lista.uf}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </>
    );
  }
}