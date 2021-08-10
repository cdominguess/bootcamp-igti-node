/*
 * Importar o módulo fs nativo do Node
 * Este módulo fs possui internamente um import para fs/promises dando um álias "promises":
 * - Possibulita mesmos métodos do fs original mas sem callbacks e sim com promises
 * 
 *  - Agora criar uma função assíncrona utilizando async
 *  - Dentro de cada Promise o await antes da chamada da function
 */
import {promises as fs} from "fs";

export async function criarArquivoAsyncAwait() {
    console.log('Criando o arquivo COM ASYNC AWAIT...');
    
    try {
        await fs.writeFile('teste-assync-await.txt', ' - Conteúdo inicial do arquivo');
        console.log('Arquivo COM ASYNC AWAIT criado com sucesso.');
            
        await fs.appendFile('teste-assync-await.txt', "\n - Conteúdo adicionado na segunda linha.");
        console.log('Arquivo COM ASYNC AWAIT alterado com sucesso.');
    
        let dados = await fs.readFile('teste-assync-await.txt');
        console.log("Conteúdo do arquivo COM ASYNC AWAIT: " + dados);
    } catch (err) {
        console.log("ERRO na geração  / alteração de arquivo com ASYNC AWAIT: " + err);
    }
};