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

}

module.exports = TurmaController;