import BaseControler from "./Base.js";
import ProdutoService from "../service/Produto.js";
export default class ProdutoControler extends BaseControler {

    constructor() {
        super(new ProdutoService());
    }
}