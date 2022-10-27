const { Router } = require('express');
const NivelController = require('../controllers/NivelController.js');

const router = Router();

router
    .get('/niveis', NivelController.buscarTodosOsNiveis)
    .get('/niveis/:id', NivelController.buscarNivelPorId)
    .post('/niveis', NivelController.cadastrarNivel)
    .post('/niveis/:id/restaurar', NivelController.restaurarNivel)
    .put('/niveis/:id', NivelController.atualizarNivel)
    .delete('/niveis/:id', NivelController.deletarNivel)

 module.exports = router;