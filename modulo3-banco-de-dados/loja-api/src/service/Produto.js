import BaseService from "./Base.js";
import ProdutoRepository from "../repository/Produto.js";
import FornecedorRepository from "../repository/Fornecedor.js";
import ProdutoInformacoesRepository from "../repository/ProdutoInformacoes.js";
export default class ProdutoService extends BaseService {

    constructor() {
        super(new ProdutoRepository());
    }

    /**
     * Método sobrescrito para buscar informaçãoes de produto do respositório do MongoDb
     * @param {integer} id 
     * @returns 
     */
    async buscarPorId(id) {
        const resultado = await this._instanciaRepository.buscarPorId(id);
        if (resultado == undefined) {
            throw { status: 404, msg: `ID ${id} não localizado.` }
        }

        const objRepositoryInfo = new ProdutoInformacoesRepository();
        resultado.informacoes = await objRepositoryInfo.buscar(id);

        return resultado;
    }


    async inserirProdutoInformacoes(obj) {
        const objRepository = new ProdutoInformacoesRepository();
        await objRepository.inserir(obj);
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

        if (obj.fornecedor_id === undefined || isNaN(obj.fornecedor_id)) {
            arrErros.push("O atributo 'fornecedor_id' não foi informado ou é inválido.");
        } else {
            const fornecedorRepository = new FornecedorRepository();
            if (await fornecedorRepository.buscarPorId(obj.fornecedor_id) == undefined) {
                arrErros.push("O atributo 'fornecedor_id' informado não existe.");
            }
        }

        if (obj.nome === undefined || obj.nome.length < 3) {
            arrErros.push("O atributo 'nome' é inválido.");
        }

        if (obj.descricao === undefined || obj.descricao.length < 10) {
            arrErros.push("O atributo 'descricao' é inválido.");
        }

        if (obj.valor === undefined || isNaN(obj.valor)) {
            arrErros.push("O atributo 'valor' é inválido.");
        }

        if (obj.estoque === undefined || isNaN(obj.estoque)) {
            arrErros.push("O atributo 'estoque' é inválido.");
        }

        if (arrErros.length > 0) {
            return arrErros;
        }

        return true;
    }
}