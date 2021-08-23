import { promises as fs } from "fs";

class PedidoRepository {

    /**
     * @param {object} objPedido 
     * @returns object
     */
    async criar(objPedido) {
        const arrPedidos = await this.carregarArquivo();

        let objInserir = {
            id: arrPedidos.nextId,
            cliente: objPedido.cliente,
            produto: objPedido.produto,
            valor: objPedido.valor,
            entregue: false,
            timestamp: new Date()
        };

        arrPedidos.nextId = parseInt(arrPedidos.nextId) + 1;
        arrPedidos.pedidos.push(objInserir);
        await this.atualizarArquivo(arrPedidos);

        return objInserir;
    }

    /**
     * Método que pode ser invocado pelo PUT ou PATCH
     * @param {integer} id
     * @param {object} objPedido 
     * @param {boolean} somenteStatus 
     * @returns object
     */
    async atualizar(id, objPedido, somenteStatus) {
        const arrPedidos = await this.carregarArquivo();
        const objPedidoDoArquivo = this.consultarPedidoPorId(id, arrPedidos);

        let objAtualizar = {
            id: parseInt(id),
            cliente: (!somenteStatus) ? objPedido.cliente : objPedidoDoArquivo.cliente,
            produto: (!somenteStatus) ? objPedido.produto : objPedidoDoArquivo.produto,
            valor: (!somenteStatus) ? objPedido.valor : objPedidoDoArquivo.valor,
            entregue: (!somenteStatus) ? objPedidoDoArquivo.entregue : objPedido.entregue,
            timestamp: objPedidoDoArquivo.timestamp,
        };

        const indexPedido = arrPedidos.pedidos.findIndex((item) => parseInt(item.id) === parseInt(id));
        arrPedidos.pedidos[indexPedido] = objAtualizar;
        await this.atualizarArquivo(arrPedidos);

        return objAtualizar;
    }

    /**
     * @param {integer} id
     * @returns boolean
     */
    async excluir(id) {
        const arrPedidos = await this.carregarArquivo();
        this.consultarPedidoPorId(id, arrPedidos);

        arrPedidos.pedidos = arrPedidos.pedidos.filter((item) => item.id != id);
        await this.atualizarArquivo(arrPedidos);

        return true;
    }

    /**
     * @param {integer} id 
     * @returns object
     */
    async consultarPorId(id) {
        const arrPedidos = await this.carregarArquivo();
        return await this.consultarPedidoPorId(id, arrPedidos);
    }

    /**
     * @param {string} nome         Nome do cliente ou do produto pesquisado
     * @param {string} tipoBusca    C=Cliente | P=Produto
     * @returns decimal
     */
    async totalPedidosPorClienteOuProduto(nome, tipoBusca) {
        const arrPedidos = await this.carregarArquivo();
        let valorTotalPedidos = 0;

        valorTotalPedidos = arrPedidos.pedidos
                .filter((item) => item.cliente == nome && item.entregue == true)
                .reduce((valorTotalPedidos, item) => (valorTotalPedidos + item.valor), 0);

        let tipoBuscaStr = (tipoBusca === 'C') ? 'Cliente' : 'Produto';

        if (valorTotalPedidos == 0) throw { httpStatus: 404, msg: "Pedido(s) do " + tipoBuscaStr + " \"" + nome + "\" não localizado(s)." }

        return parseFloat(valorTotalPedidos.toFixed(2));
    }

    /**
     * @returns array
     */
    async produtosMaisVendidos() {
        const arrPedidos = await this.carregarArquivo();

        // Filtra somente os produtos de pedidos entregues
        let arrProdutosEntregues = arrPedidos.pedidos
            .filter((item) => item.entregue == true)
            .map((itemMapear) => itemMapear.produto);
        //console.log(arrProdutosEntregues);

        // Monta um objeto de produtos entregues e suas quantidades 
        let objProdutosEntregues = Object.create(null);
        arrProdutosEntregues.forEach(item => {
            if (objProdutosEntregues[item]) {
                objProdutosEntregues[item] += 1;
            } else {
                objProdutosEntregues[item] = 1;
            }
        });
        //arrProdutosEntregues

        // Por fim percorro este objeto e monto o array final conforme enunciado da tarefa
        let arrRetorno = Object.entries(objProdutosEntregues)
            .map((item) => ({ produto: item[0], qtde: item[1] }))
            .sort((a, b) => { return b.qtde - a.qtde })
            .map(itemMap => `${itemMap.produto} - ${itemMap.qtde}`);
        //console.log(arrRetorno);

        return arrRetorno;
    }

    /**
     * Checa se um pedido existe no arquivo
     * @param {integer} id 
     * @param {array} arrPedidos 
     * @returns object 
     */
    consultarPedidoPorId(id, arrPedidos) {
        const objPedido = arrPedidos.pedidos.find((item) => parseInt(item.id) === parseInt(id));
        if (objPedido === undefined) {
            throw { httpStatus: 404, msg: "Pedido ID " + id + " não localizado." };
        }

        return objPedido;
    }

    /**
     * Retorna um array de objetos com o conteúdo do arquivo
     * @returns Array
     */
    async carregarArquivo() {
        return JSON.parse(await fs.readFile("./src/arquivo_json/pedidos.json"));
    }

    /**
     * Atualiza o array de objetos com um novo pedido
     * @param {array} arrPedidos
     * @returns Void
     */
    async atualizarArquivo(arrPedidos) {
        await fs.writeFile("./src/arquivo_json/pedidos.json", JSON.stringify(arrPedidos, null, 2));
    }
}

export default new PedidoRepository();