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
    return  `${timestamp} [${label}] ${level} ${message}`;
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

app.use('/cliente', ClienteRoute);
app.use('/produto', ProdutoRoute);
app.use('/fornecedor', FornecedorRoute);
app.use('/venda', VendaRoute);

app.listen(3000, () => {
    logger.info('API iniciada na porta 3000');
});