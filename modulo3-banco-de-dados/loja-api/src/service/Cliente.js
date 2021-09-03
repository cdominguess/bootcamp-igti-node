import objRepository from '../repository/Cliente.js';

class ClienteService {
    /**
     * @param {object} objCliente 
     * @returns object
     */
    async criar(objCliente) {
        const retValidacao = await this._validarDados(objCliente);

        if (retValidacao !== true) {
            throw { status: 400, msg: retValidacao }
        }

        return await objRepository.criar(objCliente); 
    }

    /**
     * @param {integer} id 
     * @param {object} objCliente 
     * @returns object
     */
    async atualizar(id, objCliente) {
        return await objRepository.atualizar(id, objCliente, false);
    }

    /**
     * @param {integer} id 
     * @returns object
     */
    async excluir(id) {
        return await objRepository.excluir(id);
    }

    /**
     * @param {integer} id 
     * @returns object
     */
    async consultarPorId(id) {
        return await objRepository.consultarPorId(id);
    }

    /**
     * Validação dos dados antes da persistência
     * @param {object} objCliente 
     * @returns array|boolean
     */
    async _validarDados(objCliente) {
        let arrErros = [];
        
        if (objCliente.nome === undefined || objCliente.nome.length < 3) {
            arrErros.push("Atributo 'nome' inválido.");
        }

        if (objCliente.cpf === undefined || objCliente.cpf.length < 11) {
            arrErros.push("Atributo 'cpf' inválido.");
        }

        if (objCliente.telefone === undefined || objCliente.telefone.length < 9) {
            arrErros.push("Atributo 'telefone' inválido.");
        }
        
        if (objCliente.email === undefined || objCliente.email.length < 7 || objCliente.email.indexOf('@') === -1) {
            arrErros.push("Atributo 'email' inválido.");
        }

        if (objCliente.endereco === undefined || objCliente.endereco.length < 10) {
            arrErros.push("Atributo 'endereco' inválido.");
        }

        if (arrErros.length > 0) {
            return arrErros;
        }

        return true;
    }
}

export default new ClienteService();