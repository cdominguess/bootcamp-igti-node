import BaseModel from "./Base.js";
import Sequelize from "sequelize";

export default class FornecedorModel extends BaseModel {
    
    /**
     * Novas classes de model basta estender a base e passar no contructor:
     *  - O nome da model (IDEM ao nome da tabela)
     *  - Um objeto contendo todas as propriedades da model, seguindo o padrão do Sequelize
     */
    constructor() {
        super('fornecedor', {
            fornecedorId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cnpj: {
                type: Sequelize.STRING,
                allowNull: false
            },
            telefone: {
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