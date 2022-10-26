const database = require('../models');

class TurmaController {

    static async buscarTodasAsTurmas(req, res) {
      try {
        const todasAsTurmas = await database.Turmas.findAll();
        return res.status(200).json(todasAsTurmas);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async buscarTurmaPorId(req, res){
      const id = req.params.id;
      try{
          const turma = await database.Turmas.findOne({
               where: {
                  id: Number(id)
              } 
          });
          return res.status(200).json(turma);
      }
      catch(err){
          return res.status(500).json(err.message);
      }
    }

    static async cadastrarTurma(req, res){
      const novaTurma = req.body;
      try{
          const novaTurmaCriada = await database.Turmas.create(novaTurma);
          return res.status(201).json(novaTurmaCriada);
      }
      catch(err){
          return res.status(400).json(err.message);
      }
  }

    static async atualizarTurma(req, res){
      const dadosAtualizados = req.body;
      const id = req.params.id;
      try{
          await database.Turmas.update(
              dadosAtualizados, {
              where: {
                  id: Number(id)
              }
          })
          const turmaAtualizada = await database.Turmas.findOne({
              where: {
                 id: Number(id)
             } 
         });
          return res.status(200).json(turmaAtualizada);
      }
      catch(err){
          return res.status(400).json(err.message);
      }
  }

    static async deletarTurma(req, res){
      const id = req.params.id;
      try{
          await database.Turmas.destroy({
              where: {
                  id: Number(id)
              }
          })
          return res.status(200).json( { mensagem: 'Turma deletada com sucesso' } );
      }
      catch(err){
          return res.status(400).json(err.message);
      }
  }

}

module.exports = TurmaController;