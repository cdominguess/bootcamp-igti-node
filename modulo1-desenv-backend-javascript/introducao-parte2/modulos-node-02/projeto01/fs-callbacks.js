// Importar o módulo fs nativo do Node 
import fs from "fs";

export function criarArquivoCallback() {
    console.log('Criando o arquivo COM CALLBACKS...');
    
    // fs.writeFile retorna um callback com erro somente
    fs.writeFile('teste-callbacks.txt', ' - Conteúdo inicial do arquivo.', (err) => {
        if (err) {
            console.log('ERRO ao gerar COM CALLBACKS: ', err);
        } else {
            console.log('Arquivo COM CALLBACKS criado com sucesso.');
            
            // fs.appendFile retorna um callback com erro somente
            fs.appendFile('teste-callbacks.txt', "\n - Conteúdo adicionado na segunda linha.", (err) => {
                if (err) {
                    console.log('ERRO ao adicionar conteúdo COM CALLBACKS: ', err);
                } else {
                    console.log('Arquivo COM CALLBACKS alterado com sucesso.');
                    
                    // fs.readFile Retorna um callback com erro e dados
                    fs.readFile('teste-callbacks.txt', (err, dados) => {
                        if (err) {
                            console.log('ERRO ao ler COM CALLBACKS: ', err);
                        } else {
                            console.log('Arquivo COM CALLBACKS carregado com sucesso.');
                            console.log('Conteúdo do arquivo carregado COM CALLBACKS: ' + dados);
                        }            
                    });
                }
            });
        }
    });
}