import express from 'express';
import cors from 'cors';
import winston from 'winston';

import ProprietarioRoute from './src/route/Proprietario.js';
import AnimalRoute from './src/route/Animal.js';
import ServicoRoute from './src/route/Servico.js';
import config from './src/config.js'

const app = express();
app.use(express.json());
app.use(cors());

// Define a configuração da interface de logs
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level} ${message}`;
});

// Cria variável global para chamar o log de qualquer local
global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: './src/log/petshop-api.log' })
    ],
    format: combine(
        label({ label: "petshop-api" }),
        timestamp(),
        myFormat
    )
});

// Definição das rotas
app.use('/proprietarios', ProprietarioRoute);
app.use('/animais', AnimalRoute);
app.use('/servicos', ServicoRoute);

// Tratamento genérico de erros de qualquer rota
app.use((err, req, res, next) => {
    console.log(err);

    const urlAux = (req.baseUrl != '') ? req.baseUrl : req.originalUrl;
    logger.error(`${req.method} ${urlAux} |  REQUEST: ${JSON.stringify(req.body)}  |  RESPONSE: ${JSON.stringify(err)}`);

    let status = err.status || 400;
    res.status(status).send({ success: false, msg: err.msg });
});

app.listen(config.porta, () => {
    logger.info('API iniciada na porta ' + config.porta);
});