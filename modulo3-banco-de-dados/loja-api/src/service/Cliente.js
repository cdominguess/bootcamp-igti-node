import BaseService from './Base.js';
import ClienteRepository from '../repository/Cliente.js';

export default class ClienteService extends BaseService {

    constructor() {
        super(new ClienteRepository());
    }

    /**
     * Validação dos dados antes da persistência
     * É invocado na classe base durante a execução do método "criar"
     * 
     * @param {object} objCliente 
     * @returns array|boolean
     */
    async _validarDados(objCliente) {
        let arrErros = [];

        if (objCliente.nome === undefined || objCliente.nome.length < 3) {
            arrErros.push("O atributo 'nome' é inválido.");
        }

        if (objCliente.cpf === undefined || objCliente.cpf.length < 11) {
            arrErros.push("O atributo 'cpf' é inválido.");
        }

        if (objCliente.telefone === undefined || objCliente.telefone.length < 9) {
            arrErros.push("O atributo 'telefone' é inválido.");
        }

        if (objCliente.email === undefined || objCliente.email.length < 7 || objCliente.email.indexOf('@') === -1) {
            arrErros.push("O atributo 'email' é inválido.");
        }

        if (objCliente.endereco === undefined || objCliente.endereco.length < 10) {
            arrErros.push("O atributo 'endereco' é inválido.");
        }

        if (arrErros.length > 0) {
            return arrErros;
        }

        return true;
    }
}