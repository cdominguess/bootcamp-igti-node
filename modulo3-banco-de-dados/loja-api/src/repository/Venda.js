import VendaModel from "../model/Venda.js";
import ProdutoModel from "../model/Produto.js";
import BaseRepository from "./Base.js";

export default class VendaRepository extends BaseRepository {

    constructor() {
        super('venda', 'pgSequelize', new VendaModel());
    }

    async buscarVendaPorProduto(produtoId) {

        return await this.adapter.instanciaFactoryModel.findAll({
            where: { produtoId: produtoId }
        });
    }

    async buscarVendaPorCliente(clienteId) {
        
        return await this.adapter.instanciaFactoryModel.findAll({
            where: { clienteId: clienteId }
        });
    }

    async buscarVendaPorFornecedor(fornecedorId) {
        // Instanciar a classe que representa a model, para ter acesso ao nome e atributos
        const modelProduto = new ProdutoModel();

        // Pegar a instância do banco de dados e criar uma instância de Model Sequelize para ProdutoModel
        const modelProdutoSequelize = this.adapter.instanciaConexaoDb.define(modelProduto.nome, modelProduto.atributos);
        console.log('model do sequelize: ', modelProdutoSequelize);

        return await this.adapter.instanciaFactoryModel.findAll({
            include: [
                { 
                    model: modelProdutoSequelize,
                    where: {
                        fornecedor_id: fornecedorId
                    }
                }
            ]
        });
    }
}