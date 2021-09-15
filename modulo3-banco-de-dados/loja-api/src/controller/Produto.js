import BaseControler from "./Base.js";
import ProdutoService from "../service/Produto.js";
export default class ProdutoControler extends BaseControler {

    constructor() {
        super(new ProdutoService());
    }

    async inserirProdutoInformacoes(req, res, next) {
        const obj = req.body;
        try {
            const retorno = await this._instanciaService.inserirProdutoInformacoes(obj);
            logger.info(`${req.method} ${req.baseUrl} |  REQUEST: ${JSON.stringify(obj)}  |  RESPONSE: ${JSON.stringify(retorno)}`);

            res.status(201).json({ success: true, dados: retorno });
        } catch (error) {
            next(error);
        }
    }
}