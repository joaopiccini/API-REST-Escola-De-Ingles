const { NiveisServices } = require('../services');
const niveisServices = new NiveisServices('Niveis');

class NivelController {

    static async buscarTodosOsNiveis(req, res) {
      try {
        const todosOsNiveis = await niveisServices.buscarTodosOsRegistros();
        return res.status(200).json(todosOsNiveis);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async buscarNivelPorId(req, res){
      const id = req.params.id;
      try{
          const nivel = await niveisServices.buscarRegistroPorId(id);
          return res.status(200).json(nivel);
      } catch(err){
          return res.status(500).json(err.message);
      }
    }

    static async cadastrarNivel(req, res){
      const novoNivel = req.body;
      try{
          await niveisServices.criarRegistro(novoNivel);
          return res.status(201).json( { mensagem: 'Nivel cadastrado com sucesso' } );
      } catch(err){
          return res.status(400).json(err.message);
      }
    }

    static async atualizarNivel(req, res){
      const dadosAtualizados = req.body;
      const id = req.params.id;
      try{
          await niveisServices.atualizarRegistro(dadosAtualizados, id)
          const nivelAtualizada = await niveisServices.buscarRegistroPorId(id);
          return res.status(200).json(nivelAtualizada);
      } catch(err){
          return res.status(400).json(err.message);
      }
    }

    static async deletarNivel(req, res){
      const id = req.params.id;
      try{
          await niveisServices.deletarRegistro(id);
          return res.status(200).json( { mensagem: 'Nivel deletado com sucesso' } );
      } catch(err){
          return res.status(400).json(err.message);
      }
    }

    static async restaurarNivel(req, res) {
        const id = req.params.id;
        try {
            await niveisServices.restaurarRegistro(id);
            return res.status(200).json({ mensagem: 'Nivel restaurado com sucesso'})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = NivelController;