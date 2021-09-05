export default class BaseService {

    /**
     * O Service que estender este Base, SEMPRE será o responsável por ter um constructor com os seguintes dados:
     * - Instância do Repository que está trabalhando no momento
     * 
     * @param {object} instanciaRepository
     */
     constructor(instanciaRepository) {
        this._instanciaRepository = instanciaRepository;
    }

    async buscar() {
        const resultado = await this._instanciaRepository.buscar();
        if (resultado.length == 0) {
            throw { status: 404, msg: `Nenhum registro.` }
        }

        return resultado;
    }

    async buscarPorId(id) {
        const resultado = await this._instanciaRepository.buscarPorId(id);
        if (resultado == undefined) {
            throw { status: 404, msg: `ID ${id} não localizado.` }
        }

        return resultado;
    }

    async criar(obj) {
        const retValidacao = await this._validarDados(obj);

        if (retValidacao !== true) {
            throw { status: 400, msg: retValidacao }
        }

        return await this._instanciaRepository.criar(obj);
    }

    async atualizar(obj, id) {
        if (await this._instanciaRepository.buscarPorId(id) == undefined) {
            throw { status: 404, msg: `ID ${id} não localizado.` }
        }

        return await this._instanciaRepository.atualizar(obj, id);
    }

    async excluir(id) {
        if (await this._instanciaRepository.buscarPorId(id) == undefined) {
            throw { status: 404, msg: `ID ${id} não localizado.` }
        }

        return await this._instanciaRepository.excluir(id);
    }
}