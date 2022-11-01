const { PessoasServices } = require('../services');
const pessoasServices = new PessoasServices();

class PessoaController {

    static async buscarTodasAsPessoasAtivas(req, res){
        try{
            const todasAsPessoasAtivas = await pessoasServices.buscarRegistrosAtivos();
            return res.status(200).json(todasAsPessoasAtivas);
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async buscarTodasAsPessoas(req, res){
        try{
            const todasAsPessoas = await pessoasServices.buscarTodosOsRegistros();
            return res.status(200).json(todasAsPessoas);
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async buscarPessoaPorId(req, res){
        const id = req.params.id;
        try{
            const pessoa = await pessoasServices.buscarRegistroPorId(id);
            return res.status(200).json(pessoa);
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async cadastrarPessoa(req, res){
        const novaPessoa = req.body;
        try{
            await pessoasServices.criarRegistro(novaPessoa);
            return res.status(201).json( { mensagem: 'Pessoa cadastrada com sucesso' } );
        } catch(err){
            return res.status(400).json(err.message);
        }
    }

    static async atualizarPessoa(req, res){
        const dadosAtualizados = req.body;
        const id = req.params.id;
        try{
            await pessoasServices.atualizarRegistro(dadosAtualizados, id);
            const pessoaAtualizada = await pessoasServices.buscarRegistroPorId(id);
            return res.status(200).json(pessoaAtualizada);
        } catch(err){
            return res.status(400).json(err.message);
        }
    }

    static async deletarPessoa(req, res){
        const id = req.params.id;
        try{
            await pessoasServices.deletarRegistro(id);
            return res.status(200).json( { mensagem: 'Pessoa deletada com sucesso' } );
        } catch(err){
            return res.status(400).json(err.message);
        }
    }

    static async restaurarPessoa(req, res){
        const id = req.params.id;
        try{
            await pessoasServices.restaurarRegistro(id);
            return res.status(200).json( { mensagem: 'Pessoa restaurada com sucesso' } );
        } catch(err){
            return res.status(400).json(err.message);
        }
    }

    static async inativarPessoa(req, res){
        const { estudanteId } = req.params;
        try{
            await pessoasServices.inativarPessoaEMatriculas(Number(estudanteId));
            return res.status(200).json({ mensagem: 'Pessoa e matriculas associadas foram inativadas com sucesso'});
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async buscarMatriculaPorId(req, res){
        const { estudanteId, matriculaId } = req.params;
        try{
            const matricula = await database.Matriculas.findOne({
                 where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                } 
            });
            return res.status(200).json(matricula);
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async buscarMatriculasConfirmadasPorTurma(req, res){
        const { turmaId } = req.params;
        try{
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'ASC']]
            });
            return res.status(200).json(todasAsMatriculas);
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async buscarMatriculasConfirmadas(req, res){
        const { estudanteId } = req.params;
        try{
            const pessoa = await database.Pessoas.findOne({ 
                where: {
                    id: Number(estudanteId)
                }
            });
            const matriculas = await pessoa.getMatriculasConfirmadas();
            return res.status(200).json(matriculas);
        } catch(err){
            return res.status(400).json(err.message);
        }
    }

    static async buscarTurmasLotadas(req, res){
        const lotacaoTurma = 3;
        try{
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado',
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            return res.status(200).json(turmasLotadas.count);
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async cadastrarMatricula(req, res){
        const { estudanteId } = req.params;
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
        try{
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
            return res.status(201).json(novaMatriculaCriada);
        } catch(err){
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
        } catch(err){
            return res.status(400).json(err.message);
        }
    }

    static async deletarMatricula(req, res){
        const { matriculaId } = req.params;
        try{
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId)
                }
            })
            return res.status(200).json( { mensagem: 'Matricula apagada com sucesso' } );
        } catch(err){
            return res.status(400).json(err.message);
        }
    }

    static async restaurarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await database.Matriculas.restore({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
             })
            return res.status(200).json({ mensagem: 'Matricula restaurada com sucesso'})
        }  catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = PessoaController;