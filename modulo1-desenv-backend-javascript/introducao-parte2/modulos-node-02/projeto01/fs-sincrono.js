// Importar o módulo fs nativo do Node 
import fs from "fs";

function criarArquivo() {
    try {
        console.log('Criando o arquivo SÍNCRONO...');
        fs.writeFileSync('teste-sincrono.txt', 'conteúdo inicial do arquivo 2');
        console.log('Abrindo o arquivo SÍNCRONO...');
        let conteudo = fs.readFileSync('teste-sincrono.txt');
        console.log('Conteúdo do arquivo SÍNCRONO: ' + conteudo);
    } catch (err) {
        console.log('ERRO ao criar arquivo SÍNCRONO: ' + err);
    }
}

// Como uso export default DEPOIS da declaração da function, poderei no import criar um alias que eu quiser
export default criarArquivo;