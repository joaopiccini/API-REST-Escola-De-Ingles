const Services = require('./Services.js');
const database = require('../models');

class PessoasServices extends Services {

    constructor(){
        super('Pessoas');
        this.matriculas = new Services('Matriculas');;
    }

    async buscarRegistrosAtivos(where = {}){
        return database[this.nomeDoModelo].findAll({where: {...where}});
    }

    async buscarTodosOsRegistros(where = {}){
        return database[this.nomeDoModelo].scope('todos').findAll({where: {...where}});
    }

    async inativarPessoaEMatriculas(estudanteId){
        return database.sequelize.transaction( async t => {
            await super.atualizarRegistro({ativo: false}, estudanteId, {transaction: t});
            await this.matriculas.atualizarRegistro({status: 'cancelado'}, {estudante_id: estudanteId}, {transaction: t});
        })
    }

}

module.exports = PessoasServices;