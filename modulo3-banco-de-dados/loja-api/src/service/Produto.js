import BaseService from "./Base.js";
import ProdutoRepository from "../repository/Produto.js";
import FornecedorRepository from "../repository/Fornecedor.js";
export default class ProdutoService extends BaseService {

    constructor() {
        super(new ProdutoRepository());
    }

    /**
     * Validação dos dados antes da persistência
     * É invocado na classe base durante a execução do método "criar"
     * 
     * @param {object} obj 
     * @returns array|boolean
     */
     async _validarDados(obj) {
        let arrErros = [];

        
        if (obj.fornecedor_id === undefined) {
            arrErros.push("Atributo 'fornecedor_id' não informado.");
        }
        
        const fornecedorRepository = new FornecedorRepository();
        if (await fornecedorRepository.buscarPorId(obj.fornecedor_id) == undefined) {
            arrErros.push("Atributo 'fornecedor_id' não existe.");
        }

        if (obj.nome === undefined || obj.nome.length < 3) {
            arrErros.push("Atributo 'nome' inválido.");
        }

        if (obj.descricao === undefined || obj.descricao.length < 10) {
            arrErros.push("Atributo 'descricao' inválido.");
        }

        if (obj.valor === undefined || isNaN(obj.valor)) {
            arrErros.push("Atributo 'valor' inválido.");
        }

        if (obj.estoque === undefined || isNaN(obj.estoque)) {
            arrErros.push("Atributo 'estoque' inválido.");
        }

        if (arrErros.length > 0) {
            return arrErros;
        }

        return true;
    }
}