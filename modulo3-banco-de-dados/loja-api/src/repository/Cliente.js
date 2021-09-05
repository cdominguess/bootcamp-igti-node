import BaseRepository from "./BaseRepository.js";
class ClienteRepository extends BaseRepository {
    async buscar() {
        return await this.adapter.buscar('cliente');
    }

    async buscarPorId(id) {
        return await this.adapter.buscarPorId('cliente', id);
    }

    async criar(obj) {
        return await this.adapter.criar('cliente', obj);
    }

    async atualizar(obj, id) {
        return await this.adapter.atualizar('cliente', obj, id);
    }

    async excluir(id) {
        return await this.adapter.excluir('cliente', id);
    }
}

export default new ClienteRepository();