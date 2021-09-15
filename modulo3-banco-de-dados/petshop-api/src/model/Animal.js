import BaseModel from "./Base.js";
import ProprietarioModel from "./Proprietario.js";
import Sequelize from "sequelize";

export default class AnimalModel extends BaseModel {
    
    /**
     * Novas classes de model basta estender a base e passar no contructor:
     *  - O nome da model (IDEM ao nome da tabela)
     *  - Um objeto contendo todas as propriedades da model, seguindo o padrão do Sequelize
     */
    constructor() {
        super('animal', {
            animalId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false
            },
            tipo: {
                type: Sequelize.STRING,
                allowNull: false
            },
        },
        [
            {
                model: ProprietarioModel,
                pkModel: "proprietarioId"
            }
        ]);
    }
}