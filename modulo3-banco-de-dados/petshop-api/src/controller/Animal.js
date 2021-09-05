import BaseControler from './Base.js';
import AnimalService from '../service/Animal.js';

export default class AnimalControler extends BaseControler {

    constructor() {
        super(new AnimalService);
    }
}