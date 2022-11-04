const database = require('../models')

class Services {

    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async buscarTodosOsRegistros(){
        return await database[this.nomeDoModelo].findAll()
    }

    async buscarRegistroPorId(id){
        return await database[this.nomeDoModelo].findOne({where: {id: id}})
    }

    async criarRegistro(dados, t = {}){
        return await database[this.nomeDoModelo].create(dados, t)
    }

    async atualizarRegistro(dadosAtualizados, id, t = {}){
        return await database[this.nomeDoModelo].update(dadosAtualizados, {where: {id: id}}, t)
    }

    async deletarRegistro(id, t = {}){
        return await database[this.nomeDoModelo].destroy({where: {id: id}}, t)
    }

    async restaurarRegistro(id, t = {}){
        return await database[this.nomeDoModelo].restore({where: {id: id}}, t)
    }

}

module.exports = Services