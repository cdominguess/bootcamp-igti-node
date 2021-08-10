import express from "express";

// O Router é o gerenciador de rotas do express, abaixo é instanciado a interface do mesmo
const rotas = express.Router();

/*
 * Abaixo é a definição padrão de rotas, ou seja, todas estas rotas serão controladas por este arquivo
 */
rotas.get('/', (req, res) => {
    res.send(req.method + " para " + req.path + " via Router");
})

rotas.get('/:id/emails', (req, res) => {
    res.send(req.method + " para " + req.path + " via Router");
})

rotas.get('/:id/telefones', (req, res) => {
    res.send(req.method + " para " + req.path + " via Router");
});

rotas.get('/:id/pedidos', (req, res) => {
    res.send(req.method + " para " + req.path + " via Router");
    console.log(req);
});

// Definidas as rotas, é necessário exportar esta variável "rotas" para importar e usar a mesma no index.json
export default rotas;