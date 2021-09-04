import pg from 'pg';

class PgPool {
    objConexao;

    constructor(objConfig) {
        const objPool = new pg.Pool({
            connectionString: `postgres://${objConfig.user}:${objConfig.password}@${objConfig.host}/${objConfig.database}`
        });
        this.objConexao = objPool;
    }

    async criar(obj, entidade) {
        try {
            const dadosInsert = this._montarDadosInsert(obj, entidade);
            const conn = await this.objConexao.connect();
            const res = await conn.query(dadosInsert.sql, dadosInsert.valores);

            return res.rows[0];
        } catch (err) {
            console.log("ERRO", err);
        }
    }

    /**
     * Método que monta dinamicamente o necessário para um INSERT, conforme dados de "obj" e tabela de "entidade"
     * @param {object} obj 
     * @param {string} entidade 
     * @returns object
     */
    _montarDadosInsert(obj, entidade) {
        const arrColunas = Object.keys(obj);
        const arrValores = Object.values(obj);
        const countColunas = arrColunas.length;

        let strInsert = `INSERT INTO ${entidade} (${arrColunas.join(', ')}) VALUES (`;
        for (let i = 1; i <= countColunas; i++) {
            strInsert += ((i < countColunas) ? `$${i}, ` : `$${i}`);
        }
        strInsert += `) RETURNING *;`;

        return {
            sql: strInsert,
            valores: arrValores
        }
    }

    /**
     * Método que monta dinamicamente o necessário para um UPDATE, conforme dados de "obj" e tabela de "entidade"
     * @param {object} obj 
     * @param {string} entidade 
     * @returns object
     */
    _montarDadosInsert(obj, entidade) {
        const arrColunas = Object.keys(obj);
        const arrValores = Object.values(obj);
        const countColunas = arrColunas.length;

        let strInsert = `INSERT INTO ${entidade} (${arrColunas.join(', ')}) VALUES (`;
        for (let i = 1; i <= countColunas; i++) {
            strInsert += ((i < countColunas) ? `$${i}, ` : `$${i}`);
        }
        strInsert += `) RETURNING *;`;

        return {
            sql: strInsert,
            valores: arrValores
        }
    }
}

export default PgPool;