import { promises as fs } from "fs";

class MarcaRepository {

    /**
     * Retorna um array de objetos com o conteúdo do arquivo
     * @returns Array
     */
    async carregarArquivo() {
        return JSON.parse(await fs.readFile("./src/arquivo_json/car-list.json"));
    }
}

export default new MarcaRepository();