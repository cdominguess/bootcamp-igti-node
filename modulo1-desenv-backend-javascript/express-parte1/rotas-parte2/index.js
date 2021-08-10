import express from "express";

// Cria uma instância do express. Esta instância já inicia um servidor HTTP, basta somente definir a porta com o comando "listen"
const app = express();

// Define para a aplicação que irá usar JSON no body da requisição
app.use(express.json());

// Define uma rota GET com "*" no meio do texto da rota, que possibilita a digitação de qualquer coisa onde está o *
app.get("/rota1-teste*", (req, res) => {
    res.send("Rota acessada: " + req.originalUrl + "<br>Motivo: devido a rota <b>/rota1-teste-*</b> ter sido definida com * como caractere curinga, onde estiver este eu posso digitar qualquer coisa.");
});

// Define uma rota GET com "()" o que torna opcional a digitação do que estiver dentro dos parênteses
app.get("/rota2-teste(-opcional)?", (req, res) => {
    res.send("Rota acessada: " + req.originalUrl + "<br>Motivo: <b>/rota2-teste(-opcional)?</b> efinida com ()? torna opcional a digitação do que estiver dentro dos parênteses.");
});

// Pegando padrâmetros POST no body da requisição
app.post("/rota-post-params", (req, res) => {
    res.json(req.body);
});

// Pegando parâmetros fixos GET via URL - se por o ? no final o parâmetro torna-se opcional
app.get("/rota-get-param-fixo/:id?", (req, res) => {
    res.send("Rota: " + req.path + "<br>Parâmetro: " + req.params.id);
});

// Pegando vários parâmetros GET via URL - queryString - o req.query por si só vem em formato de objeto. 
app.get("/rota-get-params/", (req, res) => {
    res.send("Rota: " + req.path + "<br>Parâmetros completos: " + JSON.stringify(req.query) + "<br>Parâmetro individual nome: " + req.query.nome);
});

app.listen(3000, () => {
    console.log("Servidor iniciado e escutando na porta 3000");
});