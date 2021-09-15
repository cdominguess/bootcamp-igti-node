import BaseControler from './Base.js';
import ServicoService from '../service/Servico.js';

export default class ServicoControler extends BaseControler {

    constructor() {
        super(new ServicoService);
    }

    async filtrarParams(req, res, next) {
        try {
            res.status(200).json({ success: true, dados: await this._instanciaService.filtrar(req.query) });
        } catch (error) {
            next(error);
        }
    }
}