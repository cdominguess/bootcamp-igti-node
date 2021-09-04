import pgPool from "./adapter/pgPool.js";
import pgSequelize from "./adapter/pgSequelize.js";
import config from "../config.js";

/**
 * Classe base para os repositórios estenderem e usarem o adaptador de conexão, que poderá ser o pgPool ou Sequelize.
 * Este parâmetro está definido no arquivo de configurações da aplicação 
 */
export default class BaseRepository {
    adapter;

    /**
     * Contrutor da classe para quando algum repositório for instanciado já definir o adapter do banco
     */
    constructor() {
        const objConfig = (process.env.NODE_ENV === 'production') ? config.dbProd : config.dbDev;
        
        if (config.adapter === 'pgPool') {
            this.adapter = new pgPool(objConfig);
        } else {
            this.adapter = new pgSequelize(objConfig);
        }
    }
}

//export default new BaseRepository();