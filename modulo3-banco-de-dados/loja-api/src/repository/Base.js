import pgPool from "./adapter/pgPool.js";
import pgSequelize from "./adapter/pgSequelize.js";
import pgMongoDb from "./adapter/pgMongoDb.js";

export default class BaseRepository {

    /**
     * Contrutor da classe para quando algum repositório for instanciado já definir o adapter do banco
     *  - Quando usar o adapter PgPool: Recebe no contructor o nome da entidade que será manipulada 
     *  - Quando usar o adapter PgSequelize: Recebe no contructor o objeto da Model será manipulada 
     * 
     * @param {string} nomeEntidade     Nome da entidade a ser manipulada
     * @param {string} adapterDb        Adaptador de acesso ao banco de dados que será utilizado
     * @param {object} objModel         Seadaptador for Sequelize, passar o objeto da model
     */
    constructor(nomeEntidade, adapterDb, objModel) {
        if (adapterDb === 'pgPool') {
            this.adapter = new pgPool(nomeEntidade);
            //console.log('ADAPTER: PgPool');
        } else if (adapterDb === 'pgSequelize') {
            this.adapter = new pgSequelize(objModel);
            //console.log('ADAPTER: PgSequelize');
        } else {
            this.adapter = new pgMongoDb(nomeEntidade);
            //console.log('ADAPTER: pgMongoDb');
        }
    }

    async buscar() {
        return await this.adapter.buscar();
    }

    async buscarPorId(id, nomeCampoId) {
        const nomeCampoIdAux = nomeCampoId || null;

        return await this.adapter.buscarPorId(id, nomeCampoIdAux);
    }

    async criar(obj) {
        return await this.adapter.criar(obj);
    }

    async atualizar(obj, id) {
        return await this.adapter.atualizar(obj, id);
    }

    async excluir(id) {
        return await this.adapter.excluir(id);
    }

    async filtrar(arrCampos, arrFiltros) {
        return await this.adapter.filtrar(arrCampos, arrFiltros);
    }
}