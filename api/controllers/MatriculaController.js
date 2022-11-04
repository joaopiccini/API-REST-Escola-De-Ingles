const { MatriculasServices } = require('../services')
const { PessoasServices } = require('../services')
const matriculasServices = new MatriculasServices()
const pessoasServices = new PessoasServices()

class MatriculaController {

    static async buscarMatriculaPorId(req, res){
        const { estudanteId, matriculaId } = req.params
        try{
            const matricula = await matriculasServices.buscarRegistroPorId(estudanteId, matriculaId)
            return res.status(200).json(matricula)
        } catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async buscarMatriculasConfirmadasPorTurma(req, res){
        const { turmaId } = req.params
        try{
            const matriculas = await matriculasServices.buscarRegistroPorTurma(turmaId)
            return res.status(200).json(matriculas)
        } catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async buscarMatriculasConfirmadasPorPessoa(req, res){
        const { estudanteId } = req.params
        try{
            const matriculas = await matriculasServices.buscarRegistroPorPessoa(estudanteId)
            return res.status(200).json(matriculas)
        } catch(err){
            return res.status(400).json(err.message)
        }
    }

    static async buscarTurmasLotadas(req, res){
        try{
            const turmasLotadas = await matriculasServices.buscarRegistrosDeTurmasLotadas()
            return res.status(200).json(turmasLotadas.count)
        } catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async cadastrarMatricula(req, res){
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try{
            const novaMatriculaCriada = await matriculasServices.criarRegistro(novaMatricula)
            return res.status(201).json(novaMatriculaCriada)
        } catch(err){
            return res.status(400).json(err.message)
        }
    }

    static async atualizarMatricula(req, res){
        const dadosAtualizados = req.body
        const { estudanteId, matriculaId } = req.params
        try{
            await matriculasServices.atualizarRegistro(dadosAtualizados, estudanteId, matriculaId)
            const matriculaAtualizada = await matriculasServices.buscarRegistroPorId(estudanteId, matriculaId)
            return res.status(200).json(matriculaAtualizada)
        } catch(err){
            return res.status(400).json(err.message)
        }
    }

    static async deletarMatricula(req, res){
        const { matriculaId } = req.params
        try{
            await matriculasServices.deletarRegistro(matriculaId)
            return res.status(200).json( { mensagem: 'Matricula apagada com sucesso' } )
        } catch(err){
            return res.status(400).json(err.message)
        }
    }

    static async restaurarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await matriculasServices.restaurarRegistro(estudanteId, matriculaId)
            return res.status(200).json({ mensagem: 'Matricula restaurada com sucesso'})
        }  catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = MatriculaController