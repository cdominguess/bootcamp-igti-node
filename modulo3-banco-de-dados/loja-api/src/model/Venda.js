import BaseModel from "./Base.js";
import ProdutoModel from "./Produto.js";
import ClienteModel from "./Cliente.js";
import Sequelize from "sequelize";

export default class VendaModel extends BaseModel {
    
    /**
     * Novas classes de model basta estender a base e passar no contructor:
     *  - O nome da model (IDEM ao nome da tabela)
     *  - Um objeto contendo todas as propriedades da model, seguindo o padrão do Sequelize
     */
    constructor() {
        super('venda', {
            vendaId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            valor: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            data: {
                type: Sequelize.DATE,
                allowNull: false
            }
        },
        [
            {
                model: ProdutoModel,
                pkModel: "produtoId"
            },
            {
                model: ClienteModel,
                pkModel: "clienteId"
            }
        ]);
    }
}