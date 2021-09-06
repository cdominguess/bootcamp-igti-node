import BaseControler from './Base.js';
import AnimalService from '../service/Animal.js';

export default class AnimalControler extends BaseControler {

    constructor() {
        super(new AnimalService);
    }

    async filtrarParams(req, res, next) {
        try {
            res.status(200).json({ success: true, dados: await this._instanciaService.filtrar(req.query) });
        } catch (error) {
            next(error);
        }
    }
}