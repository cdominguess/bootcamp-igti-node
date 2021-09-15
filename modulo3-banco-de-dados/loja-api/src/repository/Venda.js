import VendaModel from "../model/Venda.js";
import BaseRepository from "./Base.js";

export default class VendaRepository extends BaseRepository {

    constructor() {
        super('venda', 'pgSequelize', new VendaModel());
    }
}