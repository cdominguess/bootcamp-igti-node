import AnimalModel from "../model/Animal.js";
import BaseRepository from "./Base.js";

export default class AnimalRepository extends BaseRepository {

    constructor() {
        super('animal', 'pgSequelize', new AnimalModel());
    }
}