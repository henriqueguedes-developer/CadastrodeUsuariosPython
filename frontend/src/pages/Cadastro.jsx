import React from 'react';
import { useForm } from "react-hook-form";
import Home from './Home';
import api from '../services/api';


function Cadastro() {
  const Input = ({ name, label, register, ...rest }) => {
    return (
      <>
        <label>{label}</label>
        <input name={name} placeholder={name} ref={register({ required: true })} {...rest} />

      </>
    );
  };
  const { register, handleSubmit, setValue, errors } = useForm();
  const onSubmit = data => {
    api.post('/', data)
      .then(res => {
        alert("Usuário Cadastrado com Sucesso")
      });
  };

  function handleChange(evento) {
    const { value } = evento.target;

    const cep = value?.replace(/[^0-9]/g, '');
    if (cep?.length !== 8) {
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue('logradouro', data.logradouro, { shouldValidate: true });
        setValue('bairro', data.bairro, { shouldValidate: true });
        setValue('uf', data.uf, { shouldValidate: true });
        setValue('ddd', data.ddd, { shouldValidate: true });
      });
  }

  return (
    <>
      <div className="container">
        <Home />

        <h1 className="titulo">Cadastro de Usuários</h1>

        <h2>Formulario de Cadastro</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <Input name="nome" id="nome" label="Nome" register={register} />
          {errors.nome && errors.nome.type === "required" && <span>Campo Obrigatório</span>}

          <Input name="email" label="E-mail" register={register} />
          {errors.email && errors.email.type === "required" && <span>Campo Obrigatório</span>}

          <Input name="documento" label="Documento" register={register} />
          {errors.documento && errors.documento.type === "required" && <span>Campo Obrigatório</span>}

          <Input name="celular" label="Celular" register={register} />
          {errors.celular && errors.celular.type === "required" && <span>Campo Obrigatório</span>}

          <Input name="nascimento" label="Nascimento" register={register} />
          {errors.nascimento && errors.nascimento.type === "required" && <span>Campo Obrigatório</span>}

          <Input name="cep" label="Cep" register={register} onBlur={(ev) => handleChange(ev)} />
          {errors.cep && errors.cep.type === "required" && <span>Campo Obrigatório</span>}

          <Input name="logradouro" label="Logradouro" register={register} />
          {errors.logradouro && errors.logradouro.type === "required" && <span>Campo Obrigatório</span>}

          <Input name="complemento" label="Complemento" register={register} />
          {errors.complemento && errors.complemento.type === "required" && <span>Campo Obrigatório</span>}

          <Input name="bairro" label="Bairro" register={register} />
          {errors.bairro && errors.bairro.type === "required" && <span>Campo Obrigatório</span>}

          <Input name="localidade" label="Localidade" register={register} />
          {errors.uf && errors.uf.type === "required" && <span>Campo Obrigatório</span>}

          <Input name="uf" label="UF" register={register} />
          {errors.uf && errors.uf.type === "required" && <span>Campo Obrigatório</span>}

          <Input name="ddd" label="ddd" register={register} />
          {errors.ddd && errors.ddd.type === "required" && <span>Campo Obrigatório</span>}

          <button type="submit" className="btn btn-primary" id="enviar">Enviar</button>
        </form>
      </div>
    </>

  );
}


export default Cadastro;