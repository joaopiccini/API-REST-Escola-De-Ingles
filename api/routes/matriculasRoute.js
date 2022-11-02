const { Router } = require('express');
const MatriculaController = require('../controllers/MatriculaController.js');

const router = Router();

router
    .get('/pessoas/:estudanteId/matricula/confirmadas', MatriculaController.buscarMatriculasConfirmadas)
    .get('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.buscarMatriculaPorId)
    .get('/pessoas/matricula/:turmaId/confirmadas', MatriculaController.buscarMatriculasConfirmadasPorTurma)
    .get('/pessoas/matricula/lotada', MatriculaController.buscarTurmasLotadas)
    .post('/pessoas/:estudanteId/matricula', MatriculaController.cadastrarMatricula)
    .post('/pessoas/:estudanteId/matricula/:matriculaId/restaurar', MatriculaController.restaurarMatricula)
    .put('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.atualizarMatricula)
    .delete('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.deletarMatricula)

module.exports = router;