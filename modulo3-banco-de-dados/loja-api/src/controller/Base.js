
export default class BaseControler {

    constructor(nomeEntidade, objService) {
        // Nome da entidade que será manipulada
        this._nomeEntidade = nomeEntidade;

        // Instância do service para regras de negócio
        this._objService = objService;

        console.log(this);
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
            console.log('buscando por ID em BaseController');
            console.log('nome da entidade: ' + this._nomeEntidade); 
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