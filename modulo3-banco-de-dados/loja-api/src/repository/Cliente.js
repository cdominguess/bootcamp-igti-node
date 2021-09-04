import BaseRepository from "./BaseRepository.js";
class ClienteRepository extends BaseRepository {
    async criar(objCliente) {
        return await this.adapter.criar(objCliente);
    }
}

export default new ClienteRepository();