import BaseController from './Base.js';
import VendaService from '../service/Venda.js';

export default class VendaControler extends BaseController {

    constructor() {
        super(new VendaService());
    }

    /**
     * Método sobrescrito da classe base para passar à instância Service de vendas os possíveis filtros pré definidos dee queryString
     * @param {object} req 
     * @param {object} res 
     * @param {object} next 
     */
    async buscar(req, res, next) {
        try {
            res.status(200).json({ success: true, dados: await this._instanciaService.buscar(req.query.produtoId, req.query.clienteId, req.query.fornecedorId) });
        } catch (error) {
            next(error);
        }
    }
}