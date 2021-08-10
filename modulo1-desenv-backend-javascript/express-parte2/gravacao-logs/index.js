import express from "express";
import winston from "winston";

const app = new express();
app.use(express.json());

// Extrai do format da lib os itens necessários que serão utilizados
const { combine, printf, label, timestamp } = winston.format;

// Define o formato de cada linha do log
const formatoLog = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

/*
 * Níveis de LOG da lib de gravação de logs Winston
 * 0 - error
 * 1 - warn
 * 2 - info
 * 3 - http
 * 4 - verbose
 * 5 - debug
 * 6 - silly
 * 
 * Inicializa a interface de log.
 * Estando inicializada e com as definições de formatação OK, basta chamar a partir dessa variável o método referente ao nível de log desejado
 */
const logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "my-log.log" }),
    ],
    format: combine(
        label({ label: "my-app" }),
        timestamp(),
        formatoLog
    )
})


// Define uma rota default
app.get('/', (req, res) => {
    logger.error("Exemplo de mensagem do nível ERROR");
    logger.warn("Exemplo de mensagem do nível WARN");
    logger.info("Exemplo de mensagem do nível INFO");
    logger.verbose("Exemplo de mensagem do nível VERBOSE");
    logger.debug("Exemplo de mensagem do nível DEBUG");
    logger.silly("Exemplo de mensagem do nível SILLY");
    logger.http("Exemplo de mensagem do nível HTTP");
    res.send(req.method + " para " + req.path + " via index");
});

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000 ...");
});