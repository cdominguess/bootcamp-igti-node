import objRepository from "../repository/PedidoRepository.js";

class PedidoService {

    /**
     * @param {object} objPedido 
     * @returns object
     */
    async criar(objPedido) {
        return await objRepository.criar(objPedido);
    }

    /**
     * @param {integer} id 
     * @param {object} objPedido 
     * @returns object
     */
    async atualizar(id, objPedido) {
        return await objRepository.atualizar(id, objPedido, false);
    }

    /**
     * @param {integer} id 
     * @param {object} objPedido 
     * @returns object
     */
    async atualizarStatus(id, objPedido) {
        return await objRepository.atualizar(id, objPedido, true);
    }

    /**
     * @param {integer} id 
     * @returns object
     */
    async excluir(id) {
        return await objRepository.excluir(id);
    }

    /**
     * @param {integer} id 
     * @returns object
     */
    async consultarPorId(id) {
        return await objRepository.consultarPorId(id);
    }

    /**
     * @param {string} nome 
     * @returns decimal
     */
    async totalPedidosPorCliente(nome) {
        return await objRepository.totalPedidosPorClienteOuProduto(nome, 'C');
    }

    /**
     * @param {string} nome 
     * @returns decimal
     */
    async totalPedidosPorProduto(nome) {
        return await objRepository.totalPedidosPorClienteOuProduto(nome, 'P');
    }

    /**
     * @returns object
     */
    async produtosMaisVendidos() {
        return await objRepository.produtosMaisVendidos();
    }
}

export default new PedidoService();