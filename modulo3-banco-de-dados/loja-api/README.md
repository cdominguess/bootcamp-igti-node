# bootcamp-igti-node-loja-api
Criado para aprofundar estudos de criação de API com NodeJS, aplicando boas práticas e aprendizados detalhados:  

- Separação da aplicação em camadas: Controller, Service e Repository;
- Cada arquivo em determinada camada foi criado com o conceito de Classes do Javacript, assim tira-se o máximo de proveito possível da orientação à objetos que o Javascript possibilita em ES6 - sem uso de Typescrypt;
- Cada camada possui uma classe Base para que as demais estendam desta. Com isso os recursos utilizados por todas: buscar, buscarPorId, criar, atualizar e excluir estão encapsulados nas classes base;
- Por fim a classe Base de repositório receberá das classes que estendem o adapter de banco que irá trabalhar: PgPool, PgSequelize ou PgMongoDb;

Exemplo da estrutura do recurso /clientes da API:

ROUTER:
```js
import express from "express";
import controller from '../controller/Cliente.js';

const objRouter = express.Router();

objRouter.get("/", (req, res, next) => {
    const objController = new controller();
    objController.buscar(req, res, next);
});

export default objRouter;
```    
&nbsp;

CONTROLLER:
```js
import BaseControler from './Base.js';
import ClienteService from '../service/Cliente.js';
export default class ClienteControler extends BaseControler {
    
    constructor() {
        super(new ClienteService());
    }
}
```
No Controller injeta-se uma dependência do Service que o controller base irá trabalhar.  
&nbsp;

SERVICE:
```js
import BaseService from './Base.js';
import ClienteRepository from '../repository/Cliente.js';

export default class ClienteService extends BaseService {

    constructor() {
        super(new ClienteRepository());
    }

    /**
     * Validação dos dados antes da persistência
     * É invocado na classe base durante a execução do método "criar"
     * 
     * @param {object} objCliente 
     * @returns array|boolean
     */
    async _validarDados(objCliente) {
        let arrErros = [];

        if (objCliente.nome === undefined || objCliente.nome.length < 3) {
            arrErros.push("O atributo 'nome' é inválido.");
        }
        
        // Demais atributos que um objeto de cliente deve possuir, cada atributo com nome IDEM às colunas da entidade

        if (arrErros.length > 0) {
            return arrErros;
        }

        return true;
    }
}
```
No Service injeta-se uma dependência do Repository que o Service base irá trabalhar.  
&nbsp;

REPOSITORY:
```js
import BaseRepository from "./BaseRepository.js";
export default class ClienteRepository extends BaseRepository {
    
    constructor() {
        super('cliente', 'pgSequelize');
    }
}
```
No Repository apenas passar o nome da entidade que o Repository base irá trabalhar, também o adapter de banco: PgPool (driver nativo do Postgres), PgSequelize (ORM) ou PgMongoDb (driver do Mongo).  
&nbsp;

Dessa maneira fica muito fácil criar novos recursos, bastando seguir a "receita" acima.  
Um ponto importante é que as tabelas devem ter necessariamente o nome no singular, pois conforme acima a entidade "cliente" terá o seu campo PK chamado "cliente_id", e as demais entidades a serem criadas em banco devem possuir este padrão.  
&nbsp;
&nbsp;
# Passos para executar o projeto

### Requisitos:
- Ter instalado o NodeJS:
- Instalar globalmente o nodemon;  
- Renomear o arquivo "config-fake.js" para config.js  
&nbsp;

### Comandos:
```
npm install
npm run dev
```  
&nbsp;

Ao executar o ```npm run dev``` executará o script "dev" do packaje.json que por sua vez definirá uma variável de ambiente ```NODE_ENV=develop``` e executará o nodemon no index.js - há outros scripts nesse arquivo, favor conferir pois a execução dos mesmos também define qual banco de dados que será utilizado conforme definido para PROD e DEV no arquivo config.js