const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const router = Router();

router
    .get('/pessoas', PessoaController.buscarTodasAsPessoas)
    .get('/pessoas/:id', PessoaController.buscarPessoaPorId)
    .get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.buscarMatricula)
    .post('/pessoas', PessoaController.cadastrarPessoa)
    .post('/pessoas/:estudanteId/matricula', PessoaController.cadastrarMatricula)
    .put('/pessoas/:id', PessoaController.atualizarPessoa)
    .put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizarMatricula)
    .delete('/pessoas/:id', PessoaController.deletarPessoa)
    .delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deletarMatricula)

module.exports = router;