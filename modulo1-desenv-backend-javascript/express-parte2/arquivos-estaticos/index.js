import express from "express";

const app = new express();
app.use(express.json());

app.use(express.static("public"));
app.use("/documentacao", express.static("public"));

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000 ...");
});