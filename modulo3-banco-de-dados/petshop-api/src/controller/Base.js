export default class BaseControler {

    /**
     * O controller que estender este Base, SEMPRE será o responsável por ter um constructor com os seguintes dados:
     * - a instância do Sercice que está trabalhando no momento
     * 
     * @param {object} instanciaService
     */
    constructor(instanciaService) {
        this._instanciaService = instanciaService;
    }

    async buscar(req, res, next) {
        try {
            res.status(200).json({ success: true, dados: await this._instanciaService.buscar() });
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {
        try {
            res.status(200).json({ success: true, dados: await this._instanciaService.buscarPorId(req.params.id) });
        } catch (error) {
            next(error);
        }
    }

    async criar(req, res, next) {
        const obj = req.body;
        try {
            const retorno = await this._instanciaService.criar(obj);
            logger.info(`${req.method} ${req.baseUrl} |  REQUEST: ${JSON.stringify(obj)}  |  RESPONSE: ${JSON.stringify(retorno)}`);

            res.status(201).json({ success: true, dados: retorno });
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        const obj = req.body;
        try {
            const retorno = await this._instanciaService.atualizar(obj, req.params.id);
            logger.info(`${req.method} ${req.baseUrl} |  REQUEST: ${JSON.stringify(obj)}  |  RESPONSE: ${JSON.stringify(retorno)}`);

            res.status(200).json({ success: true, dados: retorno });
        } catch (error) {
            next(error);
        }
    }

    async excluir(req, res, next) {
        try {
            await this._instanciaService.excluir(req.params.id);
            res.status(204).send("");
        } catch (error) {
            next(error);
        }
    }
}