export default class BaseModel {

    /**
     * A casse base para definição de Models funciona da seguinte maneira:
     * 
     * - As models que estenderem esta classa devem passar o nome da model e seus atributos, seguindo o padrão do Sequelize para tal;
     * - Feito isso é armazenado em atributos da classe;
     * - Por fim quando o repositório base definir que usará o adapter PgSequelize, é passado no constructor deste o objeto da model;
     * - O adapter cria a conexão com o banco de dados e depois disso cria uma instância de Model Sequelize.
     * 
     * @param {string} nome 
     * @param {object} atributos 
     */
    constructor(nome, atributos, objRelacionamento) {
        this.nome = nome;
        this.atributos = atributos;
        this.relacionamento = objRelacionamento || null
    }
}