import BaseModel from "./Base.js";
import AnimalModel from "./Animal.js";
import Sequelize from "sequelize";

export default class ServicoModel extends BaseModel {
    
    /**
     * Novas classes de model basta estender a base e passar no contructor:
     *  - O nome da model (IDEM ao nome da tabela)
     *  - Um objeto contendo todas as propriedades da model, seguindo o padrão do Sequelize
     */
    constructor() {
        super('servico', {
            servicoId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            descricao: {
                type: Sequelize.STRING,
                allowNull: false
            },
            valor: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
        },
        [
            {
                model: AnimalModel,
                pkModel: "animalId"
            }
        ]);
    }
}