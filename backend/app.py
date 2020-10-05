import os
import json

from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from peewee import IntegrityError, JOIN
from dotenv import load_dotenv
from models import Contato, Endereco

load_dotenv(verbose=True)

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def recuperaContatos():
    error = 'Um erro ocorreu para a sua consulta.'
    try:
        contatos = Contato.select(Contato, Endereco).join(
            Endereco, JOIN.LEFT_OUTER)
        if((contatos.count() > 0)):
            results = jsonify(list(contatos.dicts()))
            return make_response(results, 200)
        else:
            return make_response('', 204)
    except:
        return make_response(jsonify(error), 400)


@app.route('/<uid>', methods=['GET'])
def retornaUmContato(uid):
    error = 'Um erro ocorreu para a sua consulta.'
    try:
        usuario = Contato.select(Contato, Endereco).join(
            Endereco, JOIN.LEFT_OUTER).where(Contato.id == uid)
        result = list(usuario.dicts())
        response = json.dumps(result)
        return make_response(response, 200)
    except:
        return make_response(jsonify(error), 400)


@app.route('/', methods=['POST'])
def gravaUmContato():
    error = 'Ocorreu um erro ao registrar o seu contato.'
    try:
        contato = Contato(**request.get_json())
        contato.save()       
        registro = Endereco(**request.get_json(), contato_id=contato.id)
        registro.save()
        return make_response(jsonify('Usuário Cadastrado com Sucesso.'), 200)
    except:
        return make_response(jsonify(error), 400)


@app.route('/address/<uid>', methods=['POST'])
def gravaUmEnderecoParaUmContato(uid):
    error = 'Ocorreu um erro ao registrar o endereço.'
    try:
        registro = Endereco(**request.get_json(), contato_id=uid)
        registro.save()
        return make_response(jsonify('Endereço Cadastrado com Sucesso.'), 200)
    except:
        return make_response(jsonify(error), 400)


@app.route('/<uid>', methods=['PUT'])
def updateContact(uid):
    error = 'Ocorreu um erro ao atualizar o seu contato.'
    try:
        registro = Contato(**request.get_json(), id=uid)
        registro.save()
        return make_response(jsonify('Usuário Atualizado com  Sucesso.'), 200)
    except:
        return make_response(jsonify(error), 400)


@app.route('/<uid>', methods=['DELETE'])
def dropContact(uid):
    error = 'Ocorreu um erro ao deletar usuário.'
    try:
        query = Contato.delete().where(Contato.id == uid)
        query.execute()
        return make_response(jsonify('usuário Excluido com Sucesso.'), 200)
    except:
        return make_response(jsonify(error), 400)


@app.route('/setup')
def tablesSetup():
    return {"Contato": Contato.create_table(), "Endereco": Endereco.create_table()}
