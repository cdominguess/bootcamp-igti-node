import FornecedorModel from "../model/Fornecedor.js";
import BaseRepository from "./Base.js";

export default class FornecedorRepository extends BaseRepository {

    constructor() {
        super('fornecedor', 'pgSequelize', new FornecedorModel());
    }
}