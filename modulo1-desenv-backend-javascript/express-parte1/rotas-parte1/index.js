import express from "express";

// Cria uma instância do express. Esta instância já inicia um servidor HTTP, basta somente definir a porta com o comando "listen"
const app = express();

// Define uma rota com o método "all", sendo assim tal rota se torna acessível por todos os verbos HTTP
app.all("/teste-todos-metodos", (req, res) => {
    res.send("Verbo acessado: " + req.method);
});

// Define uma rota GET com "?" que torna opcional a digitação da última letra da rota
app.get('/acesso?', (req, res) => {
    res.send("Rota acessada: " + req.originalUrl + ".<br>Motivo: devido a rota <b>/acesso?</b> ter sido definida com interrogação no final, a última letra torna-se opcional.");
})

// Define uma rota GET com "+" que possibilita a digitação da última letra da rota N vezes a mais
app.get('/acesso+', (req, res) => {
    res.send("Rota acessada: " + req.originalUrl + ".<br>Motivo: devido a rota <b>/acesso+</b> ter sido definida com sinal de mais no final, a última letra pode ser digitada N vezes a mais.");
})

app.listen(3000, () => {
    console.log("Servidor iniciado e escutando na porta 3000");
});