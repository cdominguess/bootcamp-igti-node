import BaseControler from './Base.js';
import FornecedorService from '../service/Fornecedor.js';
export default class FornecedorControler extends BaseControler {

    constructor() {
        super(new FornecedorService);
    }
}