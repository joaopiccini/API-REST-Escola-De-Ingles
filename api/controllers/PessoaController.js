const database = require('../models');

class PessoaController {

    static async buscarTodasAsPessoas(req, res){
        try{
            const todasAsPessoas = await database.Pessoas.findAll();
            return res.status(200).json(todasAsPessoas);
            console.log('Requisição recebida na rota /pessoas/id');
        }
        catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async buscarPessoaPorId(req, res){
        const id = req.params.id;
        try{
            const pessoa = await database.Pessoas.findOne({
                 where: {
                    id: Number(id)
                } 
            });
            return res.status(200).json(pessoa);
        }
        catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async cadastrarPessoa(req, res){
        const novaPessoa = req.body;
        try{
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
            return res.status(201).json(novaPessoaCriada);
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }

    static async atualizarPessoa(req, res){
        const dadosAtualizados = req.body;
        const id = req.params.id;
        try{
            await database.Pessoas.update(
                dadosAtualizados, {
                where: {
                    id: Number(id)
                }
            })
            const pessoaAtualizada = await database.Pessoas.findOne({
                where: {
                   id: Number(id)
               } 
           });
            return res.status(200).json(pessoaAtualizada);
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }

    static async deletarPessoa(req, res){
        const id = req.params.id;
        try{
            await database.Pessoas.destroy({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json( { mensagem: 'Pessoa deletada com sucesso' } );
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }

    static async buscarMatricula(req, res){
        const { estudanteId, matriculaId } = req.params;
        try{
            const matricula = await database.Matriculas.findOne({
                 where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                } 
            });
            return res.status(200).json(matricula);
        }
        catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async cadastrarMatricula(req, res){
        const { estudanteId } = req.params;
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
        try{
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
            return res.status(201).json(novaMatriculaCriada);
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }

    static async atualizarMatricula(req, res){
        const dadosAtualizados = req.body;
        const { estudanteId, matriculaId } = req.params;
        try{
            await database.Matriculas.update(
                dadosAtualizados, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            const matriculaAtualizada = await database.Matriculas.findOne({
                where: {
                   id: Number(matriculaId)
               } 
           });
            return res.status(200).json(matriculaAtualizada);
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }

    static async deletarMatricula(req, res){
        const { estudanteId, matriculaId } = req.params;
        try{
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId)
                }
            })
            return res.status(200).json( { mensagem: 'Matricula apagada com sucesso' } );
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }

}

module.exports = PessoaController;