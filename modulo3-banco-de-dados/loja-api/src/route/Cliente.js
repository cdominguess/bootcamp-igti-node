import express from "express";
import objController from '../controller/Cliente.js';

const objRouter = express.Router();

objRouter.post("/", objController.criar);
objRouter.put("/:id", objController.atualizar);
objRouter.delete("/:id", objController.excluir);
objRouter.get("/:id", objController.consultarPorId);

export default objRouter;