from os import getenv
from peewee import *

db = SqliteDatabase(getenv('Database'))

class BaseModeling(Model):
    class Meta:
        database = db

class Contato(BaseModeling):
    id = PrimaryKeyField(unique=True, primary_key=True)
    nome = CharField()
    email = CharField(unique=True)
    documento = IntegerField(unique=True, null=True)
    celular = CharField(null=True)
    nascimento = DateField(index=True)


class Endereco(BaseModeling):
    id = PrimaryKeyField(unique=True, primary_key=True)
    contato_id = ForeignKeyField(Contato, backref='enderecos')
    cep = IntegerField()
    logradouro = CharField()
    complemento = CharField()
    bairro = CharField()
    localidade = CharField()
    uf = CharField()
    ddd = IntegerField()
