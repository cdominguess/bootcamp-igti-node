import pg from 'pg';

class PgPool {
    objConexao;

    constructor(objConfig) {
        const objPool = new pg.Pool({
            connectionString: `postgres://${objConfig.user}:${objConfig.password}@${objConfig.host}/${objConfig.database}`
        });

        this.objConexao = objPool;
    }

    async criar(obj) {
        try {
            const conn = await this.objConexao.connect();
            const sql = "INSERT INTO cliente (nome, cpf, telefone, email, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING *";
            const arrValores = [obj.nome, obj.cpf, obj.telefone, obj.email, obj.endereco];
            const res = await conn.query(sql, arrValores);

            return res.rows[0];
        } catch (err) {
            console.log("ERRO", err);
        }
    }
}

export default PgPool;