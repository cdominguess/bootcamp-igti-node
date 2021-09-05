import BaseService from "./Base.js";
import AnimalRepository from "../repository/Animal.js";

export default class AnimalService extends BaseService {

    constructor() {
        super(new AnimalRepository());
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

        if (obj.cnpj === undefined || obj.cnpj.length < 11) {
            arrErros.push("O atributo 'cnpj' é inválido.");
        }

        if (obj.telefone === undefined || obj.telefone.length < 9) {
            arrErros.push("O atributo 'telefone' é inválido.");
        }

        if (obj.email === undefined || obj.email.length < 7 || obj.email.indexOf('@') === -1) {
            arrErros.push("O atributo 'email' é inválido.");
        }

        if (obj.endereco === undefined || obj.endereco.length < 10) {
            arrErros.push("O atributo 'endereco' é inválido.");
        }

        if (arrErros.length > 0) {
            return arrErros;
        }

        return true;
    }
}