// No import de módulos ECMA6 é necessário adicionar a extensão do arquivo, do contrário do comando require antigo
import op from './funcoes-export.js';
import mult from './funcoes-export2.js';
import {dividir, resto} from './funcoes-export3.js';

// Como no módulo "funcoes" foi exportado o objeto inteiro com mesmos nomes das functions, tem que chamar igual aqui
console.log(op.somar(10, 4));
console.log(op.subtrair(10, 4));
console.log("String do módulo funcoes: " + op.testeString);

// Como no módulo "funcoes2" foi exportado a function direto, pode chamar qualquer nome no comando export
console.log(mult(10, 4));

// Como no módulo "funcoes3" foi exportado via export direto, tem que usar import com mesmos nomes e dentro de chaves
console.log(dividir(10, 4));
console.log(resto(10, 4));