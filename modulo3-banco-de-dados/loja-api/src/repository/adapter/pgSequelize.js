export default class PgSequelize {

    constructor(objConfigDB, nomeEntidade) {
        console.log('ENV: ' + process.env.NODE_ENV);
        console.log('ADAPTER: PgSequelize');
        console.log('CONFIG: ', objConfigDB);
        console.log('ENTIDADE: ', nomeEntidade);


    }

    async buscar() {
        console.log("VOU BUSCAR no PgSequelize");
    }

    async buscarPorId(id) {
        console.log("VOU BUSCAR por ID no PgSequelize");
    }

    async criar(obj) {
        console.log("VOU CRIAR no PgSequelize", obj);
    }

    async atualizar(obj, id) {
        console.log("VOU ATUALIZAR no PgSequelize", obj);
    }

    async excluir(id) {
        console.log("VOU EXCLUIR no PgSequelize", id);
    }
}