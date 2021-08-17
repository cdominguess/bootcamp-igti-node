import objService from "../service/PedidoService.js"

class PedidoController {
    async criar(req, res, next) {
        try {
            res.status(201).json({ success: true, pedido: await objService.criar(req.body) });
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        try {
            res.status(200).json({ success: true, pedido: await objService.atualizar(req.params.id, req.body) });
        } catch (error) {
            next(error);
        }
    }

    async atualizarStatus(req, res, next) {
        try {
            res.status(200).json({ success: true, pedido: await objService.atualizarStatus(req.params.id, req.body) });
        } catch (error) {
            next(error);
        }
    }

    async excluir(req, res, next) {
        try {
            await objService.excluir(req.params.id);
            res.status(204).send("");
        } catch (error) {
            next(error);
        }
    }

    async consultarPorId(req, res, next) {
        try {
            res.status(200).json({ success: true, pedido: await objService.consultarPorId(req.params.id) });
        } catch (error) {
            next(error);
        }
    }

    async totalPedidosPorCliente(req, res, next) {
        try {
            res.status(200).json({ success: true, cliente: req.params.nome, valorTotalPedidos: await objService.totalPedidosPorCliente(req.params.nome) });
        } catch (error) {
            next(error);
        }
    }

    async totalPedidosPorProduto(req, res, next) {
        try {
            res.status(200).json({ success: true, produto: req.params.nome, valorTotalPedidos: await objService.totalPedidosPorProduto(req.params.nome) });
        } catch (error) {
            next(error);
        }
    }

    async produtosMaisVendidos(req, res, next) {
        try {
            res.status(200).json({ success: true, produtos: await objService.produtosMaisVendidos() });
        } catch (error) {
            next(error);
        }
    }
}

export default new PedidoController();