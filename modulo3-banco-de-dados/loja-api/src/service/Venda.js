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

    /**
     * Método sobrescrito da classe base porque ao atalizar uma venda deve-se desconsiderar o produto passado, 
     * logo tem que remover o mesmo do objeto antes de passar para o repositório
     *  
     * @param {object} obj 
     * @param {number} id 
     * @returns 
     */
    async atualizar(obj, id) {
        const objVendaOriginal = await this._instanciaRepository.buscarPorId(id);
        if (objVendaOriginal == undefined) {
            throw { status: 404, msg: `ID ${id} não localizado.` }
        }
        
        // Atribui numa variável o objeto da requisição
        const objVendaAtualizar = obj;
        
        // Atualiza nesse objeto o produto_id com base na venda do banco de dados, para desconsiderar o que possa ter vindo na requisição
        objVendaAtualizar.produto_id = objVendaOriginal.produto_id;

        return await this._instanciaRepository.atualizar(objVendaAtualizar, id);
    }

    /**
     * Método sobrescrito da classe base porque ao excluir uma venda deve-se atualizar 
     * o estoque do produto dessa venda, incrementando o mesmo em sua respectiva tabela
     * 
     * @param {number} id 
     * @returns 
     */
    async excluir(id) {
        const objVendaOriginal = await this._instanciaRepository.buscarPorId(id);
        if (objVendaOriginal == undefined) {
            throw { status: 404, msg: `ID ${id} não localizado.` }
        }

        // Exclui a venda
        await this._instanciaRepository.excluir(id);

        // Atualiza o estoque do produto
        const estoqueProd = (await this._produtoRepository.retornarEstoque(objVendaOriginal.produto_id)) + 1; //console.log('estoque para atualizar', estoqueProd);
        this._produtoRepository.atualizarEstoque(estoqueProd, objVendaOriginal.produto_id);
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