import ProdutoModel from "../model/Produto.js";
import BaseRepository from "./Base.js";

export default class ProdutoRepository extends BaseRepository {

    constructor() {
        super('produto', 'pgSequelize', new ProdutoModel());
    }

    /**
     * Método que faz um filtro na entidade de produtos para buscar o estoque conforme ID passado
     * @param {number} idProduto 
     * @returns 
     */
    async retornarEstoque(idProduto) {
        const ret = await this.filtrar(['estoque'], { produtoId: idProduto });
        
        return ret[0].estoque;
    }

    /**
     * Método que atualiza na entidade de produtos o estoque conforme ID de produto passado
     * @param {number} qtdeEstoque 
     * @param {number} idProduto 
     * @returns void 
     */
    async atualizarEstoque(qtdeEstoque, idProduto) {
        const objAtualizar = { "estoque": qtdeEstoque }; //console.log('OBJ de produto para atualizar', objAtualizar);
        
        await this.atualizar(objAtualizar, idProduto);
    }
}