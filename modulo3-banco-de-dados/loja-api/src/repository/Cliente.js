import BaseRepository from "./BaseRepository.js";
class ClienteRepository extends BaseRepository {
    async criar(objCliente) {
        return await this.adapter.criar(objCliente, 'cliente');
    }
}

export default new ClienteRepository();