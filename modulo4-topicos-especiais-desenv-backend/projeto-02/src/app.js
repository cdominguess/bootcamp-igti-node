const express = require('express');
const app = express();

app.get('/', async(req, res) => {
    res.status(200).send('Rota inicial da API');
});

module.exports = app;