const bodyParser = require('body-parser');
const pessoas = require('./pessoasRoute.js')

module.exports = app => {
    app.use(
        bodyParser.json(),
        pessoas
        );

    app.get('/', (req, res) => {
        res.status(200).send('Ola');
    })
}