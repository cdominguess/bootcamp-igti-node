import express from "express";
import * as funcoesConta from "../controller/accountController.js";

const router = express.Router();

router.post("/", (req, res) => {
    funcoesConta.cadastrar(req, res);
});

router.get("/", (req, res) => {
    funcoesConta.listar(req, res);
});

router.get("/:id", (req, res) => {
    funcoesConta.buscar(req, res);
});

router.put("/:id", (req, res) => {
    funcoesConta.atualizar(req, res);
});

router.delete("/:id", (req, res) => {
    funcoesConta.remover(req, res);
});

export default router;