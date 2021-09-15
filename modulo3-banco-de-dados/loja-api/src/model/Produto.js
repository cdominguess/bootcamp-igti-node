import BaseModel from "./Base.js";
import FornecedorModel from "./Fornecedor.js";
import Sequelize from "sequelize";

export default class ProdutoModel extends BaseModel {
    
    /**
     * Novas classes de model basta estender a base e passar no contructor:
     *  - O nome da model (IDEM ao nome da tabela)
     *  - Um objeto contendo todas as propriedades da model, seguindo o padrão do Sequelize
     */
    constructor() {
        super('produto', {
            produtoId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false
            },
            descricao: {
                type: Sequelize.STRING,
                allowNull: false
            },
            valor: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            estoque: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        },
        [
            {
                model: FornecedorModel,
                pkModel: "fornecedorId"
            }
        ]);
    }
}