# API-REST-Escola-De-Ingles
API para um sistema de controle de alunos e turmas de uma escola de inglês.
ORM com NodeJS: Sequelize e MySQL - Curso Alura

#### Rotas:
##### GET
* http://localhost:3000/pessoas
* http://localhost:3000/pessoas/ativas
* http://localhost:3000/pessoas/:id
* http://localhost:3000/pessoas/matricula/lotada
* http://localhost:3000/pessoas/matricula/:turmaId/confirmadas
* http://localhost:3000/pessoas/:estudanteId/matricula/:matriculaId
* http://localhost:3000/niveis
* http://localhost:3000/niveis/:id
* http://localhost:3000/turmas
* http://localhost:3000/turmas?data_inicial=xxxx-xx-xx&data_final=xxxx-xx-xx
* http://localhost:3000/turmas/:id


##### POST
* http://localhost:3000/pessoas
* http://localhost:3000/pessoas/:estudanteId/matricula
* http://localhost:3000/pessoas/:estudanteId/matricula/inativar
* http://localhost:3000/niveis
* http://localhost:3000/turmas

##### PUT
* http://localhost:3000/pessoas/:id
* http://localhost:3000/pessoas/:estudanteId/matricula/:matriculaId
* http://localhost:3000/niveis/:id
* http://localhost:3000/turmas/:id

##### DELETE
* http://localhost:3000/pessoas/:id
* http://localhost:3000/pessoas/:estudanteId/matricula/:matriculaId
* http://localhost:3000/niveis/:id
* http://localhost:3000/turmas/:id