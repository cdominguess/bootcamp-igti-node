import mongodb from 'mongodb';
import config from "../../config.js";

export default class PgMongoDb {

    /**
     * Constructor do adapter PgMongoDb, que utilizará o driver nativo do mongo
     * para manipular dados em banco com querys escritas dinamicamente.
     * 
     * @param {string} nomeEntidade     Nome da entidade que será manipulada
     */
    constructor(nomeEntidade) {
        this._objConexao = new mongodb.MongoClient(config.noSql.urlConexao);

        const arrNomeEntidade = nomeEntidade.split('.');
        this._nomeDatabase = arrNomeEntidade[0];
        this._nomeCollection = arrNomeEntidade[1];
    }

    async buscar() {
        const conn = this._objConexao;
        try {
            await conn.connect();
            const res = await conn.query(this._montarSqlSelectPorFiltros([], []));

            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            conn.close();
        }
    }

    async buscarPorId(id, nomeIdDocMongo) {
        const conn = this._objConexao;
        try {
            await conn.connect();
            return await conn.db(this._nomeDatabase).collection(this._nomeCollection).findOne({ produtoId: parseInt(id) });
        } catch (err) {
            throw err;
        } finally {
            conn.close();
        }
    }

    async criar(obj) {
        const conn = this._objConexao;
        try {
            await conn.connect();
            await conn.db(this._nomeDatabase).collection(this._nomeCollection).insertOne(obj);
        } catch (err) {
            throw err;
        } finally {
            conn.close();
        }
    }

    async atualizar(obj, id) {
        const conn = this._objConexao;
        try {
            await conn.connect();

            const res = await conn.query(this._montarSqlUpdate(obj), [id]);

            return res.rows[0];
        } catch (err) {
            throw err;
        } finally {
            conn.close();
        }
    }

    async excluir(id) {
        const conn = this._objConexao;
        try {
            await conn.connect();

            const res = await conn.query(`DELETE FROM ${this._nomeEntidade} WHERE ${this._nomeEntidade}_id = $1`, [id]);

            return res.rows[0];
        } catch (err) {
            throw err;
        } finally {
            conn.close();
        }
    }

    /**
     * Método que busca campos dinamicamente em uma tabela com base nos filtros passados
     * @param {array} arrCampos 
     * @param {array} arrValores 
     * @returns 
     */
    async filtrar(arrCampos, arrValores) {
        const conn = this._objConexao;
        try {
            await conn.connect();

            const res = await conn.query(this._montarSqlSelectPorFiltros(arrCampos, arrValores));

            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }
}