/*
 * Este módulo nativo permite criar um servidor em determinada porta
 */
import http from "http";

export function criarServidor(porta) {
    console.log('Criando o servidor para escutar na porta ' +  porta + ' ...');

    /*
     * O createServer retorna um callback com os objetos request e response
     * - request: para capturar argumentos de entrada das chamadas ao servidor
     * - response: para definir a saída das chamadas ao servidor. Exemplo http code, headers, etc
     */
    http.createServer((objRequest, objResponse) => {
        objResponse.statusCode = 200;
        console.log("Acesso realizado ao servidor na porta " + porta);
        
        objResponse.setHeader('content-type', 'application/json');
        objResponse.write(JSON.stringify({chave: "valor"}));

        objResponse.end();
    }).listen(porta);
}