import BaseControler from './Base.js';
import ClienteService from '../service/Cliente.js';
export default class ClienteControler extends BaseControler {
    constructor() {
        super('cliente', new ClienteService());
    }
}

//export default new ClienteControler; 