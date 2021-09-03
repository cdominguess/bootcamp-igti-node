import express from 'express';
import cors from 'cors';
import winston from 'winston';

import ClienteRoute from './src/route/Cliente.js';
import ProdutoRoute from './src/route/Produto.js';
import FornecedorRoute from './src/route/Fornecedor.js';
import VendaRoute from './src/route/Venda.js';

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
        new (winston.transports.File)({ filename: './src/log/loja-api.log' })
    ],
    format: combine(
        label({ label: "loja-api" }),
        timestamp(),
        myFormat
    )
});

// Definição das rotas
app.use('/clientes', ClienteRoute);
app.use('/fornecedores', FornecedorRoute);
app.use('/produtos', ProdutoRoute);
app.use('/vendas', VendaRoute);

// Tratamento genérico de erros de qualquer rota
app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} |  REQUEST: ${JSON.stringify(req.body)}  |  RESPONSE: ${JSON.stringify(err)}`);

    let status = err.status || 400;
    res.status(status).send({ success: false, msg: err.msg });
});

app.listen(3000, () => {
    logger.info('API iniciada na porta 3000');
});