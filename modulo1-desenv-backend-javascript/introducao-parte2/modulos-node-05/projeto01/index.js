import { monitorarEventos } from "./modulo-events.js";

console.log("\nUtilizando events para monitorar e interagir com eventos no script -------------------------------------------:");

const eventos = monitorarEventos();

eventos.emit("evento-teste-01", "Este é o conteúdo enviado para o evento evento-teste");