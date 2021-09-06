import BaseService from './Base.js';
import ProprietarioRepository from '../repository/Proprietario.js';

export default class ProprietarioService extends BaseService {

    constructor() {
        super(new ProprietarioRepository());
    }

    /**
     * Validação dos dados antes da persistência
     * É invocado na classe base durante a execução do método "criar"
     * 
     * @param {object} obj 
     * @returns array|boolean
     */
    async _validarDados(obj) {
        let arrErros = [];

        if (obj.nome === undefined || obj.nome.length < 3) {
            arrErros.push("O atributo 'nome' é inválido.");
        }

        if (obj.telefone === undefined || obj.telefone.length < 9) {
            arrErros.push("O atributo 'telefone' é inválido.");
        }

        if (arrErros.length > 0) {
            return arrErros;
        }

        return true;
    }
}