class PgSequelize {
    /**
     * Receberá a instância da config do Sequelize
     */
    objConexao;

    constructor(objConfig) {
        console.log('ENV: ' + process.env.NODE_ENV);
        console.log('ADAPTER: PgSequelize');
        console.log('CONFIG: ', objConfig);

        /*if (this.objConexao !== undefined) {
            return this.objConexao.connect();
        }

        const objPool = new pg.Pool({

        });*/

    }

    criar(objeto) {
        console.log("VOU CRIAR no PgSequelize", objeto);
    }
}

export default PgSequelize;