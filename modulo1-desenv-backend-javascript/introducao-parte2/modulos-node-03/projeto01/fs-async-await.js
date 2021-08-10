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
    console.log('Criando o arquivo JSON...');
    
    try {
        let objAluno = {
            nome: "Carlos Domingues",
            curso: "Bootcamp Node.js",
            modulos_realizados: [
                "Módulo 0",
                "Módulo 1",
            ]
        };

        await fs.writeFile('teste-assync-await.json', JSON.stringify(objAluno));
        console.log('Arquivo JSON criado com sucesso.');
        
        let objAlterar = JSON.parse(await fs.readFile('teste-assync-await.json'));
        objAlterar.modulos_realizados.push("Módulo 03");
        await fs.writeFile('teste-assync-await.json', JSON.stringify(objAlterar));
        console.log('Arquivo JSON alterado com sucesso.');
    
        let dados = await fs.readFile('teste-assync-await.json');
        console.log("Conteúdo do arquivo JSON: ", JSON.parse(dados));
    } catch (err) {
        console.log("ERRO na geração  / alteração de arquivo: " + err);
    }
};