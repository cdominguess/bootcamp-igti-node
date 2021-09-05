import BaseControler from './Base.js';
import ProprietarioService from '../service/Proprietario.js';

export default class ProprietarioControler extends BaseControler {

    constructor() {
        super(new ProprietarioService());
    }
}