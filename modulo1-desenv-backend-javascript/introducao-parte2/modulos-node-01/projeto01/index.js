const operacoes = require('./funcoes-require');
const mult = require('./funcoes-require2');

// Como no módulo "funcoes" foi exportado o objeto inteiro com mesmos nomes das functions, tem que chamar igual aqui
console.log(operacoes.somar(10, 4));
console.log(operacoes.subtrair(10, 4));
console.log("String do módulo funcoes: " + operacoes.testeString);

// Como no módulo "funcoes2" foi exportado a function direto, pode chamar qualquer nome no comando require
console.log(mult(10, 4));