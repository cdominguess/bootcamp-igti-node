import BaseController from './Base.js';
import VendaService from '../service/Venda.js';
export default class VendaControler extends BaseController {

    constructor() {
        super(new VendaService());
    }
}