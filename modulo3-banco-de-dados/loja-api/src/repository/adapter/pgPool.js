import pg from 'pg';
import config from "../../config.js";

export default class PgPool {

    /**
     * Constructor do adapter PgPool, que utilizará o driver nativo do postgreSQL 
     * para manipular dados em banco com querys escritas dinamicamente.
     * 
     * @param {string} nomeEntidade     Nome da entidade que será manipulada
     */
    constructor(nomeEntidade) {
        const objConfigDB = (process.env.NODE_ENV === 'production') ? config.dbProd : config.dbDev;

        const objPool = new pg.Pool({
            connectionString: `postgres://${objConfigDB.user}:${objConfigDB.password}@${objConfigDB.host}/${objConfigDB.database}`
        });

        this._objConexao = objPool;
        this._nomeEntidade = nomeEntidade;
    }

    async buscar() {
        const conn = await this._objConexao.connect();
        try {
            const res = await conn.query(this._montarSqlSelectPorFiltros([], []));

            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }

    async buscarPorId(id) {
        const conn = await this._objConexao.connect();
        try {
            const res = await conn.query(`SELECT * FROM ${this._nomeEntidade} WHERE ${this._nomeEntidade}_id = $1`, [id]);

            return res.rows[0];
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }

    async criar(obj) {
        const conn = await this._objConexao.connect();
        try {
            const dadosInserir = Object.values(obj);
            const res = await conn.query(this._montarSqlInsert(obj), dadosInserir);

            return res.rows[0];
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }

    async atualizar(obj, id) {
        const conn = await this._objConexao.connect();
        try {
            const res = await conn.query(this._montarSqlUpdate(obj), [id]);

            return res.rows[0];
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }

    async excluir(id) {
        const conn = await this._objConexao.connect();
        try {
            const res = await conn.query(`DELETE FROM ${this._nomeEntidade} WHERE ${this._nomeEntidade}_id = $1`, [id]);

            return res.rows[0];
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }

    /**
     * Método que busca campos dinamicamente em uma tabela com base nos filtros passados
     * @param {array} arrCampos 
     * @param {array} arrValores 
     * @returns 
     */
    async filtrar(arrCampos, arrValores) {
        const conn = await this._objConexao.connect();
        try {
            const res = await conn.query(this._montarSqlSelectPorFiltros(arrCampos, arrValores));

            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }

    /**
     * Método que monta dinamicamente o necessário para um SELECT por filtros diversos.
     * Os filtros serão de dois tipos somente: string (str), númerico (num) ou boolean (bool)
     * Os filtros devem vir nesse formato: [{campo: "nome_campo", tipo: "str", valor: "valor a ser procurado no campo"}]
     * 
     * @param {array} campos     Array com os campos que deverão ser retornados da entidade. Caso null, retornará todos os campos
     * @param {array} filtros    Array com os filtros para recuperar a entidade no banco de dados 
     * @returns string
     */
    _montarSqlSelectPorFiltros(campos, filtros) {
        try {
            const camposAux = (campos == undefined || campos.length == 0) ? '*' : campos.join(', ');
            let strSelect = `SELECT ${camposAux} FROM ${this._nomeEntidade} WHERE 1=1 `;
            //console.log('campos:', campos);
            //console.log('filtros:', filtros);

            let countFiltros = filtros.length;
            if (countFiltros > 0) {
                let arrFiltros = [];
                for (let i = 0; i < countFiltros; i++) {
                    if (filtros[i].tipo === 'str') {
                        arrFiltros.push(`${filtros[i].campo} ILIKE '%${filtros[i].valor}%'`);
                    } else if (filtros[i].tipo === 'num') {
                        arrFiltros.push(`${filtros[i].campo} = ${filtros[i].valor}`);
                    } else if (filtros[i].tipo === 'bool') {
                        let valorAux = (filtros[i].valor == true) ? 't' : 'f';
                        arrFiltros.push(`${filtros[i].campo} = ${valorAux}`);
                    } else {
                        throw { msg: `O filtro ${filtros[i]} possui um tipo inválido para consulta.` }
                    }
                }
                strSelect += `AND ${arrFiltros.join(' AND ')}`;
            }
            strSelect += ` ORDER BY ${this._nomeEntidade}_id`;
            //console.log(strSelect);

            return strSelect;
        } catch (err) {
            throw { status: 400, msg: '[adapter_error] ' + err.message }
        }
    }

    /**
     * Método que monta dinamicamente o necessário para um INSERT
     * @param {object} obj  Objeto contendo os dados da entidade para inserir
     * @returns string
     */
    _montarSqlInsert(obj) {
        try {
            const arrColunas = Object.keys(obj);
            const countColunas = arrColunas.length;

            let strInsert = `INSERT INTO ${this._nomeEntidade} (${arrColunas.join(', ')}) VALUES (`;
            for (let i = 1; i <= countColunas; i++) {
                strInsert += ((i < countColunas) ? `$${i}, ` : `$${i}`);
            }
            strInsert += `) RETURNING *`; //console.log('sql INSERT', strInsert);

            return strInsert;
        } catch (err) {
            throw { status: 400, msg: '[adapter_error] ' + err.message }
        }
    }

    /**
     * Método que monta dinamicamente o necessário para um UPDATE
     * @param {object} obj  Objeto contendo os dados da entidade para atualizar
     * @param {number} id   ID da entidade para atualizar
     * @returns string
     */
    _montarSqlUpdate(obj, id) {
        try {
            const arrColunas = Object.keys(obj);
            const arrValores = Object.values(obj);
            const countColunas = arrColunas.length;

            let arrAtualizar = [];
            let strUpdate = `UPDATE ${this._nomeEntidade} SET `;
            for (let i = 0; i < countColunas; i++) {
                arrAtualizar.push(`${arrColunas[i]}='${arrValores[i]}'`);
            }
            strUpdate += arrAtualizar.join(', ') + ` WHERE ${this._nomeEntidade}_id=$1 RETURNING *`; //console.log('sql UPDATE:', strUpdate);

            return strUpdate;
        } catch (err) {
            throw { status: 400, msg: '[adapter_error] ' + err.message }
        }
    }
}