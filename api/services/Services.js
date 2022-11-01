const database = require('../models')

class Services {

    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async buscarTodosOsRegistros(){
        return await database[this.nomeDoModelo].findAll();
    }

    async buscarUmRegistro(id){

    }

    async criarRegistro(dados){
        
    }

    async atualizarRegistro(dadosAtualizados, id, t = {}){
        return await database[this.nomeDoModelo].update(dadosAtualizados, { where: { id: id } }, t);
    }

    async atualizarRegistro(dadosAtualizados, where, t = {}){
        return await database[this.nomeDoModelo].update(dadosAtualizados, { where: { ...where } }, t);
    }

    async deletarRegistro(id){
        
    }

}

module.exports = Services;