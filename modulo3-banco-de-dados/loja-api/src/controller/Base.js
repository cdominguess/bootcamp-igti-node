export default class BaseControler {

    /**
     * O controller que estender este Base, SEMPRE será o responsável por ter um constructor com os seguintes dados:
     * - O nome da entidade | - a instância do Sercice
     * 
     * @param {string} nomeEntidade     Nome da entidade que deverá ser encaminhada via Service, por fim ao repositório 
     * @param {object} objService       Instância do Service que está trabalhando no momento
     */
    constructor(nomeEntidade, objService) {
        // Nome da entidade que será manipulada
        this._nomeEntidade = nomeEntidade;

        // Instância do Service para regras de negócio
        this._objService = objService;
    }

    async buscar(req, res, next) {
        try {
            res.status(200).json({ success: true, dados: await this._objService.buscar() });
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {
        try {
            res.status(200).json({ success: true, dados: await this._objService.buscarPorId(req.params.id) });
        } catch (error) {
            next(error);
        }
    }

    async criar(req, res, next) {
        const obj = req.body;
        try {
            const retorno = await this._objService.criar(obj);
            logger.info(`${req.method} ${req.baseUrl} |  REQUEST: ${JSON.stringify(obj)}  |  RESPONSE: ${JSON.stringify(retorno)}`);

            res.status(201).json({ success: true, dados: retorno });
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        const obj = req.body;
        try {
            const retorno = await this._objService.atualizar(obj, req.params.id);
            logger.info(`${req.method} ${req.baseUrl} |  REQUEST: ${JSON.stringify(obj)}  |  RESPONSE: ${JSON.stringify(retorno)}`);

            res.status(200).json({ success: true, dados: retorno });
        } catch (error) {
            next(error);
        }
    }

    async excluir(req, res, next) {
        try {
            await this._objService.excluir(req.params.id);
            res.status(204).send("");
        } catch (error) {
            next(error);
        }
    }
}