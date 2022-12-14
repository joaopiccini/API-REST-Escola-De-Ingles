const { TurmasServices } = require('../services')
const turmasServices = new TurmasServices('Turmas')
const sequelize = require('sequelize')
const Op = sequelize.Op

class TurmaController {

    static async buscarTodasAsTurmas(req, res) {
        const { data_inicial, data_final } = req.query
        const where = {}
        data_inicial || data_final ? where.data_inicio = {} : null
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicio[Op.lte] = data_final : null
      try {
        const todasAsTurmas = await turmasServices.buscarTodosOsRegistros({where})
        return res.status(200).json(todasAsTurmas)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }

    static async buscarTurmaPorId(req, res){
      const id = req.params.id
      try{
          const turma = await turmasServices.buscarRegistroPorId(id)
          return res.status(200).json(turma)
      } catch(err){
          return res.status(500).json(err.message)
      }
    }

    static async cadastrarTurma(req, res){
      const novaTurma = req.body
      try{
          await turmasServices.criarRegistro(novaTurma)
          return res.status(201).json( { mensagem: 'Turma criada com sucesso' } )
      } catch(err){
          return res.status(400).json(err.message)
      }
    }

    static async atualizarTurma(req, res){
      const dadosAtualizados = req.body
      const id = req.params.id
      try{
          await turmasServices.atualizarRegistro(dadosAtualizados, id)
          const turmaAtualizada = await turmasServices.buscarRegistroPorId(id)
          return res.status(200).json(turmaAtualizada)
      } catch(err){
          return res.status(400).json(err.message)
      }
    }

    static async deletarTurma(req, res){
      const id = req.params.id
      try{
          await turmasServices.deletarRegistro(id)
          return res.status(200).json( { mensagem: 'Turma deletada com sucesso' } )
      } catch(err){
          return res.status(400).json(err.message)
      }
    }

    static async restaurarTurma(req, res) {
        const id = req.params.id
        try {
            await turmasServices.restaurarRegistro(id)
            return res.status(200).json({ mensagem: 'Turma restaurada com sucesso'})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = TurmaController