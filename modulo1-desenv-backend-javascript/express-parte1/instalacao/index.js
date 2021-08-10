/*
 * O módulo instalado express é um framework para criação de aplicações em Node.js
 */
import express from "express";

/*
 * Cria uma instância do express.
 * Esta instância já inicia um servidor HTTP, basta somente definir a porta com o comando "listen"
 */
const app = express();

// Define uma rota GET default para o acesso inicial ao servidor
app.get("/", (req, res) => {
    res.send("GET para rota padrão / realidado com sucesso.");
    
    /*let objRetorno = { chave: "valor" };
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.json(objRetorno);*/
});

// Define uma rota POST default
app.post('/', (req, res) => {
    res.send("POST para rota padrão / realidado com sucesso.");
})

app.listen(3000, () => {
    console.log("Servidor iniciado e escutando na porta 3000");
});