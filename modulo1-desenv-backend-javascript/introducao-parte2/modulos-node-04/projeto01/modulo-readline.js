/*
 * Este módulo nativo permite criar interações com o console, recebendo argumentos e imprimindo
 */
import readline from "readline";

export function multiplosDeCinco() {
    /*
     * É obrigatório o input e output na criação dessa interface, senão não aparece a pergunta caso não definir o output
     */
    const objReadLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Cria uma função anônima
    const pergunta = () => {
        objReadLine.question("Digite um número para obter seus múltiplos de 5: ", (numero) => {
            
            if (parseInt(numero) === 0) {
                objReadLine.close();
            } else {
                const multiplos = [];
                for (let i = 5; i < parseInt(numero); i++)  {
                    if (i % 5 === 0) {
                        multiplos.push(i);
                    }
                }

                console.log(`Múltiplos de 5 para o número ${numero}: `, multiplos);

                // Chama novamente a função anônima, até ser digitado o ZERO
                pergunta();
            }
        });
    }

    // Chama a função anônima uma primeira vez
    pergunta();
}