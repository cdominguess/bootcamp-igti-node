import { criarArquivoCallback } from "./fs-callbacks.js";
import criarArquivoSincrono from "./fs-sincrono.js";
import { criarArquivoPromises } from "./fs-promises.js";
import { criarArquivoAsyncAwait } from "./fs-async-await.js";

console.log('Utilizando fs com callbacks ----------------------------------------------------------:');
criarArquivoCallback();

console.log("\nUtilizando fs síncrono -------------------------------------------------------------:");
criarArquivoSincrono();

console.log("\nUtilizando fs com promises ---------------------------------------------------------:");
criarArquivoPromises();

console.log("\nUtilizando fs com promises E async await -------------------------------------------:");
criarArquivoAsyncAwait();