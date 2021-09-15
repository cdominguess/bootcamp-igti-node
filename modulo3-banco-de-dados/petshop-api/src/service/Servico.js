import BaseService from "./Base.js";
import ServicoRepository from "../repository/Servico.js";

export default class ServicoService extends BaseService {

    constructor() {
        super(new ServicoRepository());
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

        if (obj.descricao === undefined || obj.nome.length < 3) {
            arrErros.push("O atributo 'descricao' é inválido.");
        }

        if (obj.valor === undefined || isNaN(obj.tipo)) {
            arrErros.push("O atributo 'valor' é inválido.");
        }
        
        if (arrErros.length > 0) {
            return arrErros;
        }

        return true;
    }
}