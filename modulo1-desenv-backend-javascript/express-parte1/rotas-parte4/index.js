import express from "express";

// Cria uma instância do express. Esta instância já inicia um servidor HTTP, basta somente definir a porta com o comando "listen"
const app = express();

/*
 * Usando o método app.route() do Express
 * - Possibilita que para uma mesma rota seja definidos callbacks conforme o verbo HTTP executado
 * - Por exemplo, a rota /usuários/:id? poderá ser um GET, POST, PUT ou DELETE
 */
app.route('/rota-usuarios/:id?')
    .get((req, res) => {
        res.send(req.method + " para " + req.path);
    })
    .post((req, res) => {
        res.send(req.method + " para " + req.path);
    })
    .put((req, res) => {
        res.send(req.method + " para " + req.path);
    })
    .delete((req, res) => {
        res.send(req.method + " para " + req.path);
    })

app.listen(3000, () => {
    console.log("Servidor iniciado e escutando na porta 3000 !!");
});