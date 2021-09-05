import express from "express";
import controller from '../controller/Cliente.js';

const objRouter = express.Router();

/*
 * Durante testes diversos descobri que o jeito padrão de declarar a rota,
 * algo como objRouter.get("/", objController.buscar); possui o seguinte problema:
 * 1 - Já gera uma instância do objeto em questão, no caso o controller que foi apenas importado até o momento;
 * 2 - Isso causa transtornos quando tem que se passar algo para o constructor() desse controller.
 * 
 * SOLUÇÃO ENCONTRADA:
 *   - Declarar o router como o primeiro exemplo abaixo, assim gera-se uma instância do controller que será executada somente quando a rota for chamada
 */

objRouter.get("/:id", (req, res, next) => {
    const objController = new controller;
    objController.buscarPorId(req, res, next);
});

// objRouter.post("/", objController.criar);
// objRouter.put("/:id", objController.atualizar);
// objRouter.delete("/:id", objController.excluir);

export default objRouter;