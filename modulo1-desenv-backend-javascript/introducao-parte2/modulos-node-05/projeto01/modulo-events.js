/*
 * Este módulo nativo permite emitir e monitorar eventos durante a execução de um script
 */
import { EventEmitter } from "events";

export function monitorarEventos() {
    const eventEmitter = new EventEmitter();

    eventEmitter.on("evento-teste-01", (retornoAposEmissaoEvento) => {
        console.log("Conteúdo retornado na emissão do evento: ", retornoAposEmissaoEvento);
    });

    return eventEmitter;
}