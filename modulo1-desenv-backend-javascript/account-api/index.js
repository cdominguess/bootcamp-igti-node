import express from "express";
import { promises as fs } from "fs";
import accountsRouter from "./routes/accounts.js";

const { writeFile, readFile } = fs;

const app = new express();
app.use(express.json());

app.use("/account", accountsRouter);

/*
 * Objetivo: em um primeiro acesso à API verificar se o arquivo JSON de contas existe. Se não existir, cria-lo.
 */
app.listen(3000, async () => {
    try {
        // O try é para ler um arquivo tendo certeza que este existe
        await readFile("./json_accounts/file.json").then(() => {
            console.log("API iniciada e JSON de contas lido.");
        });
    } catch (err) {
        // O catch é quando se acessa a primeira vez a API, a resposta do readFile gera ou padrão um erro de "no such file or directory", então deve-se criar o arquivo
        let objJson = {
            nextId: 1,
            accounts: []
        };
        await writeFile("./json_accounts/file.json", JSON.stringify(objJson)).then(() => {
            console.log("API iniciada e JSON de contas criado.");
        });
    }
});