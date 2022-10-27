const database = require('../models');

class NivelController {

    static async buscarTodosOsNiveis(req, res) {
      try {
        const todosOsNiveis = await database.Niveis.findAll();
        return res.status(200).json(todosOsNiveis);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async buscarNivelPorId(req, res){
      const id = req.params.id;
      try{
          const nivel = await database.Niveis.findOne({
               where: {
                  id: Number(id)
              } 
          });
          return res.status(200).json(nivel);
      }
      catch(err){
          return res.status(500).json(err.message);
      }
    }

    static async cadastrarNivel(req, res){
      const novoNivel = req.body;
      try{
          const novoNivelCriado = await database.Niveis.create(novoNivel);
          return res.status(201).json(novoNivelCriado);
      }
      catch(err){
          return res.status(400).json(err.message);
      }
    }

    static async atualizarNivel(req, res){
      const dadosAtualizados = req.body;
      const id = req.params.id;
      try{
          await database.Niveis.update(
              dadosAtualizados, {
              where: {
                  id: Number(id)
              }
          })
          const nivelAtualizada = await database.Niveis.findOne({
              where: {
                 id: Number(id)
             } 
         });
          return res.status(200).json(nivelAtualizada);
      }
      catch(err){
          return res.status(400).json(err.message);
      }
    }

    static async deletarNivel(req, res){
      const id = req.params.id;
      try{
          await database.Niveis.destroy({
              where: {
                  id: Number(id)
              }
          })
          return res.status(200).json( { mensagem: 'Nivel deletado com sucesso' } );
      }
      catch(err){
          return res.status(400).json(err.message);
      }
    }

    static async restaurarNivel(req, res) {
        const id = req.params.id;
        try {
            await database.Niveis.restore({
                where: { 
                    id: Number(id) 
                } 
            })
            return res.status(200).json({ mensagem: 'Nivel restaurado com sucesso'})
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = NivelController;