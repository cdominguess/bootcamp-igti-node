import BaseService from "./Base.js";
import FornecedorRepository from "../repository/Fornecedor.js";
export default class FornecedorService extends BaseService {

    constructor() {
        super(new FornecedorRepository());
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
            arrErros.push("Atributo 'nome' inválido.");
        }

        if (obj.cnpj === undefined || obj.cnpj.length < 11) {
            arrErros.push("Atributo 'cnpj' inválido.");
        }

        if (obj.telefone === undefined || obj.telefone.length < 9) {
            arrErros.push("Atributo 'telefone' inválido.");
        }

        if (obj.email === undefined || obj.email.length < 7 || obj.email.indexOf('@') === -1) {
            arrErros.push("Atributo 'email' inválido.");
        }

        if (obj.endereco === undefined || obj.endereco.length < 10) {
            arrErros.push("Atributo 'endereco' inválido.");
        }

        if (arrErros.length > 0) {
            return arrErros;
        }

        return true;
    }
}