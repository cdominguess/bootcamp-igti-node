import ServicoModel from "../model/Servico.js";
import BaseRepository from "./Base.js";

export default class ServicoRepository extends BaseRepository {

    constructor() {
        super('servico', 'pgSequelize', new ServicoModel());
    }
}