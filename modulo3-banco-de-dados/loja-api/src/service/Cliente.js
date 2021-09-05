import objRepository from '../repository/Cliente.js';

export default class ClienteService {
    async buscar() {
        const resultado = await objRepository.buscar();
        if (resultado.length == 0) {
            throw { status: 404, msg: `Nenhum registro.` }
        }

        return resultado;
    }

    async buscarPorId(id) {
        console.log('buscando ID ' + id + ' em ClienteService');
        const resultado = await objRepository.buscarPorId(id);
        if (resultado == undefined) {
            throw { status: 404, msg: `ID ${id} não localizado.` }
        }

        return resultado;
    }

    async criar(obj) {
        const retValidacao = await this._validarDados(obj);

        if (retValidacao !== true) {
            throw { status: 400, msg: retValidacao }
        }

        return await objRepository.criar(obj);
    }

    async atualizar(obj, id) {
        if (await objRepository.buscarPorId(id) == undefined) {
            throw { status: 404, msg: `ID ${id} não localizado.` }
        }

        return await objRepository.atualizar(obj, id);
    }

    async excluir(id) {
        if (await objRepository.buscarPorId(id) == undefined) {
            throw { status: 404, msg: `ID ${id} não localizado.` }
        }

        return await objRepository.excluir(id);
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

//export default new ClienteService();