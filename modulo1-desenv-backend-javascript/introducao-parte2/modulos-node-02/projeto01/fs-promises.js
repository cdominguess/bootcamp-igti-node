/*
 * Importar o módulo fs nativo do Node
 * Este módulo fs possui internamente um import para fs/promises dando um álias "promises":
 * - Possibulita mesmos métodos do fs original mas sem callbacks e sim com Promises
 */
import {promises as fs} from "fs";

export const criarArquivoPromises = () => {
    console.log('Criando o arquivo COM PROMISES...');
    fs.writeFile('teste-promises.txt', ' - Conteúdo inicial do arquivo').then(() => {
        console.log('Arquivo COM PROMISES criado com sucesso.');
        
        fs.appendFile('teste-promises.txt', "\n - Conteúdo adicionado na segunda linha.").then(() => {
            console.log('Arquivo COM PROMISES alterado com sucesso.');

            fs.readFile('teste-promises.txt').then((dados) => {
                console.log("Contaúdo do arquivo COM PROMISES: " + dados);
            }).catch((err) => {
                console.log("ERRO ao ler arquivo COM PROMISES: " + err);
            });
        }).catch((err) => {
            console.log("ERRO ao alterar arquivo COM PROMISES: " + err);
        });
    }).catch((err) => {
        console.log("ERRO ao gerar arquivo COM PROMISES: " + err);
    })
};