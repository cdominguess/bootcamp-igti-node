import BaseRepository from "./Base.js";

export default class ProdutoInformacoesRepository extends BaseRepository {

    /**
     * Para Reposotory que utilizar MongoDb, passar o nome do database.collection no atributo da entidade
     */
    constructor() {
        super('loja.produtoInformacoes', 'pgMongoDb');
    }

    async inserir(obj) {
        await this.criar(obj);
    }

    async buscar(idProduto) {
        return await this.buscarPorId(idProduto, 'produtoId');
    }
}