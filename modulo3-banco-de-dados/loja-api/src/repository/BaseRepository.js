import pgPool from "./adapter/pgPool.js";
import pgSequelize from "./adapter/pgSequelize.js";
import config from "../config.js";
export default class BaseRepository {

    /**
     * Contrutor da classe para quando algum repositório for instanciado já definir o adapter do banco
     * Também recebe no contructor o nome da entidade que será manipulada
     * 
     * @param {string} nomeEntidade
     */
    constructor(nomeEntidade) {
        const objConfigDB = (process.env.NODE_ENV === 'production') ? config.dbProd : config.dbDev;

        if (config.adapter === 'pgPool') {
            this.adapter = new pgPool(objConfigDB, nomeEntidade);
        } else {
            this.adapter = new pgSequelize(objConfigDB, nomeEntidade);
        }
    }

    async buscar() {
        return await this.adapter.buscar();
    }

    async buscarPorId(id) {
        return await this.adapter.buscarPorId(id);
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