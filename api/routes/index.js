const bodyParser = require('body-parser')
const path = require('path')
const pessoas = require('./pessoasRoute.js')
const niveis = require('./niveisRoute.js')
const turmas = require('./turmasRoute.js')
const matriculas = require('./matriculasRoute.js')

module.exports = app => {
    app.use(
        bodyParser.json(),
        pessoas,
        niveis,
        turmas,
        matriculas
        );

    app.get('/', (req, res, next) => {
        const options = {
            root: path.join('')
        };
        const file = 'README.md'
        res.status(200).sendFile(file, options, (err) => {
            if(err){
                next(err)
            } else {
                console.log('Sent:', file)
            }
        })
    })
}