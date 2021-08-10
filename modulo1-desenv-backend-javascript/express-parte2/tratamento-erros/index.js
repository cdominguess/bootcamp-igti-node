import express from "express";

const app = new express();
app.use(express.json());


app.get('/', (req, res) => {
    throw new Error("Mensagem detalhada do erro");
})

/* 
 * O tratamento de erros com app.use() deve ser feito SEMPRE após todas as declarações de rotas da aplicação,
 * para que o mesmo consiga capturar qualquer erro de qualquer rota possível.
 */
app.use((err, req, res, next) => {
    res.status(409).send("Ocorreu o seguinte erro: " + err);
    console.log(err);
})

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000 ...");
});