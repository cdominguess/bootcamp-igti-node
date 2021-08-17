import express from "express";
import objRotas from "./src/rotas.js";

const porta = 8081;

const app = new express();
app.use(express.json());

app.use("/marcas", objRotas);

app.listen(porta, () => {
    console.log(`API iniciada na porta ${porta}`);
});