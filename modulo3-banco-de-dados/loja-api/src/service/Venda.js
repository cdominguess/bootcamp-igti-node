import BaseService from '../service/Base.js';
import VendaRepository from '../repository/Venda.js';
import ClienteRepository from '../repository/Cliente.js';
import ProdutoRepository from '../repository/Produto.js';
export default class VendaService extends BaseService {

    constructor() {
        super(new VendaRepository());

        this._produtoRepository = new ProdutoRepository();
        this._clienteRepository = new ClienteRepository();
    }

    /**
     * Método sobrescrito da classe base porque ao criar uma venda é necessário executar a seguinte ação:
     * - Diminuir o valor do estoque do produto
     * 
     * @param {object} obj  O Objeto com os dados para a criação da venda 
     * @returns object      O Objeto da venda criada
     */
    async criar(obj) {
        const retValidacao = await this._validarDados(obj);
        if (retValidacao !== true) {
            throw { status: 400, msg: retValidacao }
        }

        // Cria a venda
        const objVendaCriada = await this._instanciaRepository.criar(obj);

        // Atualiza o estoque do produto
        const estoqueProd = (await this._produtoRepository.retornarEstoque(obj.produto_id)) - 1; //console.log('estoque para atualizar', estoqueProd);
        this._produtoRepository.atualizarEstoque(estoqueProd, obj.produto_id);

        return objVendaCriada;
    }

    async atualizar(obj, id) {
        if (await this._instanciaRepository.buscarPorId(id) == undefined) {
            throw { status: 404, msg: `ID ${id} não localizado.` }
        }

        return await this._instanciaRepository.atualizar(obj, id);
    }

    async excluir(id) {
        if (await this._instanciaRepository.buscarPorId(id) == undefined) {
            throw { status: 404, msg: `ID ${id} não localizado.` }
        }

        return await this._instanciaRepository.excluir(id);
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

        if (obj.cliente_id === undefined || isNaN(obj.cliente_id)) {
            arrErros.push("O atributo 'cliente_id' não foi informado ou é inválido.");
        } else {
            // Valida se o cliente passado existe no banco
            if (await this._clienteRepository.buscarPorId(obj.cliente_id) == undefined) {
                arrErros.push("O atributo 'cliente_id' informado não existe.");
            }
        }
        
        if (obj.produto_id === undefined || isNaN(obj.produto_id)) {
            arrErros.push("O atributo 'produto_id' não foi informado ou é inválido.");
        } else {
            // Valida se o produto passado existe no banco
            if (await this._produtoRepository.buscarPorId(obj.produto_id) == undefined) {
                arrErros.push("O atributo 'produto_id' informado não existe.");
            }
            
            // Valida se o produto passado possui estoque para ser vendido
            const estoqueProd = await this._produtoRepository.retornarEstoque(obj.produto_id); //console.log('estoque atual antes da venda:', estoqueProd);
            if (estoqueProd == 0) {
                arrErros.push("O 'produto_id' informado está com o estoque zerado.");
            }
        }

        if (obj.valor === undefined || isNaN(obj.valor)) {
            arrErros.push("O atributo 'valor' é inválido.");
        }

        if (arrErros.length > 0) {
            return arrErros;
        }

        return true;
    }
}