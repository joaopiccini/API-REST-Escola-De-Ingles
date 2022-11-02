const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const router = Router();

router
    .get('/pessoas', PessoaController.buscarTodasAsPessoas)
    .get('/pessoas/ativas', PessoaController.buscarTodasAsPessoasAtivas)
    .get('/pessoas/:id', PessoaController.buscarPessoaPorId)
    .post('/pessoas', PessoaController.cadastrarPessoa)
    .post('/pessoas/:id/restaurar', PessoaController.restaurarPessoa)
    .post('/pessoas/:estudanteId/inativar', PessoaController.inativarPessoa)
    .put('/pessoas/:id', PessoaController.atualizarPessoa)
    .delete('/pessoas/:id', PessoaController.deletarPessoa)

module.exports = router;