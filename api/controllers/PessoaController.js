const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices()

class PessoaController {

    static async buscarTodasAsPessoasAtivas(req, res){
        try{
            const todasAsPessoasAtivas = await pessoasServices.buscarRegistrosAtivos()
            return res.status(200).json(todasAsPessoasAtivas)
        } catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async buscarTodasAsPessoas(req, res){
        try{
            const todasAsPessoas = await pessoasServices.buscarTodosOsRegistros()
            return res.status(200).json(todasAsPessoas)
        } catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async buscarPessoaPorId(req, res){
        const id = req.params.id
        try{
            const pessoa = await pessoasServices.buscarRegistroPorId(id)
            return res.status(200).json(pessoa)
        } catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async cadastrarPessoa(req, res){
        const novaPessoa = req.body
        try{
            await pessoasServices.criarRegistro(novaPessoa)
            return res.status(201).json( { mensagem: 'Pessoa cadastrada com sucesso' } )
        } catch(err){
            return res.status(400).json(err.message)
        }
    }

    static async atualizarPessoa(req, res){
        const dadosAtualizados = req.body
        const id = req.params.id
        try{
            await pessoasServices.atualizarRegistro(dadosAtualizados, id)
            const pessoaAtualizada = await pessoasServices.buscarRegistroPorId(id)
            return res.status(200).json(pessoaAtualizada)
        } catch(err){
            return res.status(400).json(err.message)
        }
    }

    static async deletarPessoa(req, res){
        const id = req.params.id
        try{
            await pessoasServices.deletarRegistro(id)
            return res.status(200).json( { mensagem: 'Pessoa deletada com sucesso' } )
        } catch(err){
            return res.status(400).json(err.message)
        }
    }

    static async restaurarPessoa(req, res){
        const id = req.params.id
        try{
            await pessoasServices.restaurarRegistro(id)
            return res.status(200).json( { mensagem: 'Pessoa restaurada com sucesso' } )
        } catch(err){
            return res.status(400).json(err.message)
        }
    }

    static async inativarPessoa(req, res){
        const { estudanteId } = req.params
        try{
            await pessoasServices.inativarPessoaEMatriculas(Number(estudanteId))
            return res.status(200).json({ mensagem: 'Pessoa e matriculas associadas foram inativadas com sucesso'})
        } catch(err){
            return res.status(500).json(err.message)
        }
    }

}

module.exports = PessoaController