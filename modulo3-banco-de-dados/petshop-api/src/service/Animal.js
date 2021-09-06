import BaseService from "./Base.js";
import AnimalRepository from "../repository/Animal.js";
import ProprietarioRepository from "../repository/Proprietario.js";
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

        if (obj.tipo === undefined || obj.tipo.length < 3) {
            arrErros.push("O atributo 'tipo' é inválido.");
        }

        if (obj.proprietario_id === undefined || isNaN(obj.proprietario_id)) {
            arrErros.push("O atributo 'proprietario_id' é inválido.");
        } else {
            // Valida se o proprietário passado existe no banco
            const proprietarioRepo = new ProprietarioRepository();
            if (await proprietarioRepo.buscarPorId(obj.proprietario_id) == undefined) {
                arrErros.push("O atributo 'proprietario_id' informado não existe.");
            }
        }
        
        if (arrErros.length > 0) {
            return arrErros;
        }

        return true;
    }
}