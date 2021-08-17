import express from "express";
import objController from "./controller/PedidoController.js";

const objRouter = express.Router();

// Rota padrão da API
objRouter.get("/", (req, res) => {
    res.status(200).json({success: true, msg: "API desenvolvida para o desafio do módulo 01 do bootcamp IGTI Node.js"});
});

objRouter.post("/", objController.criar);
objRouter.put("/:id", objController.atualizar);
objRouter.patch("/:id", objController.atualizarStatus);
objRouter.delete("/:id", objController.excluir);
objRouter.get("/consultar/:id", objController.consultarPorId);
objRouter.get("/valorTotalCliente/:nome", objController.totalPedidosPorCliente);
objRouter.get("/valorTotalProduto/:nome", objController.totalPedidosPorProduto);
objRouter.get("/produtosMaisVendidos", objController.produtosMaisVendidos);

objRouter.use((err, req, res, next) => {
    let httpStatus = err.httpStatus || 400;
    res.status(httpStatus).send({ success: false, msg: err.msg });
});

export default objRouter;