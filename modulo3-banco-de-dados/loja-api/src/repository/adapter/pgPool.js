import pg from 'pg';

class PgPool {
    objConexao;

    constructor(objConfigDB) {
        const objPool = new pg.Pool({
            connectionString: `postgres://${objConfigDB.user}:${objConfigDB.password}@${objConfigDB.host}/${objConfigDB.database}`
        });
        this.objConexao = objPool;
    }

    async buscar(entidade) {
        const conn = await this.objConexao.connect();
        try {
            const res = await conn.query(this._montarSqlSelectPorFiltros(entidade, [], []));

            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }

    async buscarPorId(entidade, id) {
        const conn = await this.objConexao.connect();
        try {
            const res = await conn.query(`SELECT * FROM ${entidade} WHERE ${entidade}_id = ${id}`);

            return res.rows[0];
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }
    
    async criar(entidade, obj) {
        const conn = await this.objConexao.connect();
        try {
            const dadosInserir = Object.values(obj);
            const res = await conn.query(this._montarSqlInsert(entidade, obj), dadosInserir);
            
            return res.rows[0];
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }
    
    async atualizar(entidade, obj, id) {
        const conn = await this.objConexao.connect();
        try {
            const res = await conn.query(this._montarSqlUpdate(entidade, obj, id));
            
            return res.rows[0];
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }

    async excluir(entidade, id) {
        const conn = await this.objConexao.connect();
        try {
            const res = await conn.query(`DELETE FROM ${entidade} WHERE ${entidade}_id = ${id}`);

            return res.rows[0];
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
     * @param {string} entidade  Nome da entidade no banco de dados
     * @param {array} campos     Array com os campos que deverão ser retornados da entidade. Caso null, retornará todos os campos
     * @param {array} filtros    Array com os filtros para recuperar a entidade no banco de dados 
     * @returns string
     */
    _montarSqlSelectPorFiltros(entidade, campos, filtros) {
        try {
            const camposAux = (campos == undefined || campos.length == 0) ? '*' : campos.join(', ');
            let strSelect = `SELECT ${camposAux} FROM ${entidade} WHERE 1=1 `;
    
            let countFiltros = filtros.length;
            if (countFiltros > 0) {
                let arrFiltros = [];
                for (let i = 0; i < countFiltros; i++) {
                    if (filtros[i].tipo === 'str') {
                        arrFiltros.push(`${filtros[i].campos} ILIKE '%${filtros[i].valor}%'`);
                    } else if (filtros[i].tipo === 'num') {
                        arrFiltros.push(`${filtros[i].campos} = ${filtros[i].valor}`);
                    } else if (filtros[i].tipo === 'bool') {
                        let valorAux = (filtros[i].valor == true) ? 't' : 'f';
                        arrFiltros.push(`${filtros[i].campos} = ${valorAux}`);
                    } else {
                        throw { msg: `O filtro ${filtros[i]} possui um tipo inválido para consulta.` }
                    }
                }
                strSelect += `AND ${arrFiltros.join(' AND ')}`;
            }
    
            return strSelect;
        } catch (err) {
            throw { status: 400, msg: '[adapter_error] ' + err.message }
        }
    }

    /**
     * Método que monta dinamicamente o necessário para um INSERT
     * @param {string} entidade     Nome da entidade no banco de dados
     * @param {object} obj          Objeto contendo os dados da entidade para inserir
     * @returns string
     */
    _montarSqlInsert(entidade, obj) {
        try {
            const arrColunas = Object.keys(obj);
            const countColunas = arrColunas.length;
    
            let strInsert = `INSERT INTO ${entidade} (${arrColunas.join(', ')}) VALUES (`;
            for (let i = 1; i <= countColunas; i++) {
                strInsert += ((i < countColunas) ? `$${i}, ` : `$${i}`);
            }
            strInsert += `) RETURNING *`;
    
            return strInsert;
        } catch (err) {
            throw { status: 400, msg: '[adapter_error] ' + err.message }
        }
    }

    /**
     * Método que monta dinamicamente o necessário para um UPDATE
     * @param {string} entidade     Nome da entidade no banco de dados
     * @param {object} obj          Objeto contendo os dados da entidade para atualizar
     * @param {number} id           ID da entidade para atualizar
     * @returns string
     */
    _montarSqlUpdate(entidade, obj, id) {
        try {
            const arrColunas = Object.keys(obj);
            const arrValores = Object.values(obj);
            const countColunas = arrColunas.length;
    
            let arrAtualizar = [];
            let strUpdate = `UPDATE ${entidade} SET `;
            for (let i = 0; i < countColunas; i++) {
                arrAtualizar.push(`${arrColunas[i]}='${arrValores[i]}'`);
            }
            strUpdate += arrAtualizar.join(', ') + ` WHERE ${entidade}_id=${id} RETURNING *`;
            //console.log('sql:', strUpdate); return false;

            return strUpdate;
        } catch (err) {
            throw { status: 400, msg: '[adapter_error] ' + err.message }
        }
    }
}

export default PgPool;