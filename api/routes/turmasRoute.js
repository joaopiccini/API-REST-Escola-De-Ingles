const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController');

const router = Router();

router
    .get('/turmas', TurmaController.buscarTodasAsTurmas)
    .get('/turmas/:id', TurmaController.buscarTurmaPorId)
    .post('/turmas', TurmaController.cadastrarTurma)
    .put('/turmas/:id', TurmaController.atualizarTurma)
    .delete('/turmas/:id', TurmaController.deletarTurma)

module.exports = router;