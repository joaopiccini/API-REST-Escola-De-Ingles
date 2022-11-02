const Services = require('./Services.js')
const database = require('../models')
const sequelize = require('sequelize')

class MatriculasServices extends Services {

    constructor(){
        super('Matriculas')
    }

    async buscarRegistroPorId(estudanteId, matriculaId){
        return await database[this.nomeDoModelo].findOne({
            where: {
                id: matriculaId, 
                estudante_id: estudanteId
            }
        })
    }

    async buscarRegistroPorTurma(turmaId){
        return await database[this.nomeDoModelo].findAndCountAll({
            where: {
                turma_id: turmaId, 
                status: 'confirmado'
            }, 
            order: [['estudante_id', 'ASC']]
        })
    }
    async buscarRegistrosDeTurmasLotadas(turmaId){
        const lotacaoTurma = 2;
        return await database[this.nomeDoModelo].findAndCountAll({
            where: {
                status: 'confirmado',
            },
            attributes: ['turma_id'],
            group: ['turma_id'],
            having: sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
        })
    }

}

module.exports = MatriculasServices;