import BaseModel from "./Base.js";
import Sequelize from "sequelize";

export default class ClienteModel extends BaseModel {
    
    /**
     * Novas classes de model basta estender a base e passar no contructor:
     *  - O nome da model (IDEM ao nome da tabela)
     *  - Um objeto contendo todas as propriedades da model, seguindo o padrão do Sequelize
     */
    constructor() {
        super('cliente', {
            clienteId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cpf: {
                type: Sequelize.STRING,
                allowNull: false
            },
            telefone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            endereco: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
    }
}