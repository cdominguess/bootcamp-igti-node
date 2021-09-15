import ProprietarioModel from "../model/Proprietario.js";
import BaseRepository from "./Base.js";

export default class ProprietarioRepository extends BaseRepository {
    
    constructor() {
        super('proprietario', 'pgSequelize', new ProprietarioModel());
    }
}