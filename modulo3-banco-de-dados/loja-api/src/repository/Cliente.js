import ClienteModel from "../model/Cliente.js";
import BaseRepository from "./Base.js";

export default class ClienteRepository extends BaseRepository {
    
    /**
     * Quando um repository for trabalhar com Sequelize, tem que seguir os passos:
     * - Passar uma instância da model a ser manipulada;
     * 
     * - Estas models estarão na pasta específica e estendem de uma Model base;
     * 
     * - O Repository base já sabe que deverá trabalhar com o adapter do Sequelize devido à definição
     *   disso resgatada do arquivo de configs, então este passa para o adapter a instância da model;
     * 
     * - Por fim o adapter recebe esta instância e usa a mesma em seus métodos default: buscar, buscarPorId, criar, atualizar e excluir.
     */
    constructor() {
        super('cliente', 'pgSequelize', new ClienteModel());
    }
}