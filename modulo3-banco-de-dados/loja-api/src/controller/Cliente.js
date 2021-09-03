import objService from '../service/Cliente.js';

class ClienteControler {
    async criar(req, res, next) {
        const objCliente = req.body;

        try {
            const retorno = await objService.criar(objCliente);
            logger.info(`${req.method} ${req.baseUrl} |  REQUEST: ${JSON.stringify(objCliente)}  |  RESPONSE: ${JSON.stringify(retorno)}`);
            
            res.status(201).json({ success: true, dados: retorno });
        } catch (error) {
            next(error);
        }
    }
    
    async atualizar(req, res, next) {
        const objCliente = req.body;

        try {
            const retorno = await objService.atualizar(req.params.id, objCliente);
            logger.info(`${req.method} ${req.baseUrl} |  REQUEST: ${JSON.stringify(objCliente)}   | RESPONSE: ${JSON.stringify(retorno)}`);
            
            res.status(200).json({ success: true, dados: retorno });
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
            res.status(200).json({ success: true, dados: await objService.consultarPorId(req.params.id) });
        } catch (error) {
            next(error);
        }
    }
}

export default new ClienteControler();