import express from "express";
import objController from "./controller/MarcaController.js";

const objRouter = express.Router();

// Rota padrão da API
objRouter.get("/", (req, res) => {
    res.status(200).json({success: true, msg: "API desenvolvida para o trabalho prático do módulo 01 do bootcamp IGTI Node.js"});
});

objRouter.get("/maisModelos", objController.retornarMarcaComMaisModelos);
objRouter.get("/menosModelos", objController.retornarMarcaComMenosModelos);
objRouter.get("/listaMaisModelos/:limite", objController.retornarMarcasComMaisModelosLimit);
objRouter.get("/listaMenosModelos/:limite", objController.retornarMarcasComMenosModelosLimit);
objRouter.post("/listaModelos", objController.retornarListaModelosPorMarca);

export default objRouter;