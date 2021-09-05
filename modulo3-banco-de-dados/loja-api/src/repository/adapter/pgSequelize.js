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

    async criar(obj) {
        console.log("VOU CRIAR no PgSequelize", obj);
    }

    async buscar() {
        console.log("VOU BUSCAR no PgSequelize");
    }

    async buscarPorId(id) {
        console.log("VOU BUSCAR por ID no PgSequelize");
    }
}

export default PgSequelize;