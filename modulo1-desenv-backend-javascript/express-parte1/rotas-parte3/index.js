import express from "express";

// Cria uma instância do express. Esta instância já inicia um servidor HTTP, basta somente definir a porta com o comando "listen"
const app = express();

// Usando o "next" para rodar mais de um callback em uma rota
let arrRespostas = [];
app.get("/rota-multiplos-callbacks", (req, res, next) => {
    arrRespostas.push("Callback 01 executado.");

    // Depois das ações do primeiro callback é necessário chamar o método next() para poder processar os próximos
    next();
}, (req, res) => {
    arrRespostas.push("Callback 02 executado.");

    // Para finalizar as execuções deve-se chamar req.end() após exibir a saída 
    res.send(arrRespostas.join("<br>"));
    res.end();
});

/*
 * Uma rota pode receber um array de funções callbacks para serem executados.
 * - As chamadas para next(), res.send() e res.end() estarão em cada function na ordem de execução dentro do array;
 * - O callback do app.get() será o próprio array com os nomes exatos das functions de callbacks;
 * - As funções de callback têm que ser escritas ou importadas ANTES de serem adicionadas ao array para execução!!!
 */
let arrRespostas1 = [];

const fnCallback01 = (req, res, next) => {
    arrRespostas1.push("Callback 01 do array - OK.");
    next();
};

const fnCallback02 = (req, res, next) => {
    arrRespostas1.push("Callback 02 do array - OK.");
    next();
};

function fnCallback03(req, res) {
    arrRespostas1.push("Callback 03 do array - OK.");
    res.send(arrRespostas1.join("<br>"));
    res.end();
}

app.get('/rota-multiplos-callbacks-array', [fnCallback01, fnCallback02, fnCallback03]);

app.listen(3000, () => {
    console.log("Servidor iniciado e escutando na porta 3000");
});