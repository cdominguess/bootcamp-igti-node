import express from "express";
import rotasUsuario from "./rotas.js";

const app = new express();
app.use(express.json());

/*
 * O uso de app.use() é muito diversificado, e faz com que as instruções contidas nele sejam executadas para qualquer rota acessada na aplicação
 * - Abaixo um exemplo de imprimir a data de execução e rota acessada em background para cada requisição realizada;
 * - Isso é útil por exemplo para geravação de logs personalizados.
 * - Note que é necessário o next() como última instrução dentro desse app.use()
 */
app.use((req, res, next) => {
    // Nesse exemplo imprimo um objeto qualquer que poderá ser persistido como log
    console.log({rota: req.path, data: new Date()});
    next();
});

/*
 * O Express possui um gerenciador de rotas chamado Router.
 * - Basta criar um arquivo JS com as rotas e importar aqui no index.js
 * - Nesse arquivo terá uma rota base definida, e a partir dessas todas estarão sendo gerenciadas pelo Router;
 * - A rota base é "/usuarios", ou seja, tudo a partir dela estará sendo gerenciado no arquivo de rotas.
 */
app.use('/usuarios', rotasUsuario);

// Define uma rota default
app.get('/', (req, res) => {
    res.send(req.method + " para " + req.path + " via index");
});

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000 ...");
});