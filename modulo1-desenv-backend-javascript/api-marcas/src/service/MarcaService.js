import objRepository from "../repository/MarcaRepository.js";

class MarcaService {

    /**
     * Conforme critério de ordenação no atributo quantidade de modelos por marca, 
     * retorna um array com mais de um elemento OU retornar apenas o nome da marca conforme ordenação
     * 
     * @param {string} ordenacao 
     * @returns (array|string)
     */
    async retornarMarcaPorOrdenacaoQtdeModelos(ordenacao) {
        let arrMarcasAndQtdeOrdenado = this.ordenarPorQtdeModelos(this.montarArrayMarcasAndQuantidades(await objRepository.carregarArquivo()), ordenacao);

        // Busca a primeira quantidade conforme ordenação, para filtrar por esta e retornar o(s) item(s) em um array
        let qtdeFiltrar = arrMarcasAndQtdeOrdenado[0].qtde;

        // Conforme solicitado retorna um novo array com UMA ou mais marcas com mesma quantidade ordenada
        let arrIMarcasFiltradas = arrMarcasAndQtdeOrdenado
            .filter((itemFiltrar) => itemFiltrar.qtde === parseInt(qtdeFiltrar))
            .map((itemMapear) => itemMapear.marca);

        return (arrIMarcasFiltradas.length > 1) ? arrIMarcasFiltradas.sort() : arrIMarcasFiltradas[0];
    }

    /**
     * Conforme critério de ordenação no atributo quantidade de modelos por marca, 
     * retorna um array as marcas cuja a quantidade será o limite estipulado por parâmetro. 
     * 
     * @param {string} ordenacao 
     * @param {number} qtdeLimite 
     * @returns array
     */
    async retornarMarcasPorOrdenacaoQtdeModelosLimit(ordenacao, qtdeLimite) {
        let arrMarcasAndQtdeOrdenado = this.ordenarPorQtdeModelos(this.montarArrayMarcasAndQuantidades(await objRepository.carregarArquivo()), ordenacao);

        let lenArrArquivo = arrMarcasAndQtdeOrdenado.length;
        if (isNaN(parseInt(qtdeLimite)) || (qtdeLimite <= 0 || qtdeLimite > lenArrArquivo)) {
            throw new Error(`Digite um valor limite entre 1 e ${lenArrArquivo}.`);
        }

        // Conforme solicitado retorna um novo array a quantidade limite solicitada
        let arrMarcasFiltradas = arrMarcasAndQtdeOrdenado
            .filter((itemFiltrar, indiceItemFiltrar) => indiceItemFiltrar++ < parseInt(qtdeLimite))
            .map((itemMapear) => ({ marca: itemMapear.marca, qtde: itemMapear.qtde }));

        this.ordenarPorQtdeAndMarca(arrMarcasFiltradas, ordenacao);

        return arrMarcasFiltradas.map((itemMapear) => `${itemMapear.marca} - ${itemMapear.qtde}`);
    }

    /**
     * Retorna um array os modelos conforme a marca pesquisada. 
     * 
     * @param {Object} jsonBody 
     * @returns array
     */
    async retornarListaModelosPorMarca(jsonBody) {
        let arrDados = this.montarArrayMarcasAndQuantidades(await objRepository.carregarArquivo());

        if (Object.keys(jsonBody).length === 0 || jsonBody.marca === undefined) {
            throw new Error(`Preencha o item "marca" corretamente para listar os modelos.`);
        }

        const arrModelos = arrDados
            .filter((itemFiltrar) => itemFiltrar.marca.toString().toLowerCase() == jsonBody.marca.toString().toLowerCase())
            .map((itemMapear) => itemMapear.modelos);

        return arrModelos[0] || [];
    }

    /**
     * Retorna um array de objetos contendo a marca, sua respectiva quantidade de modelos e os modelos
     * 
     * @param {array} arrDados 
     * @returns array
     */
    montarArrayMarcasAndQuantidades(arrDados) {
        let arrRetorno = [];

        arrDados.map((item) => {
            arrRetorno.push({ marca: item.brand, qtde: item.models.length, modelos: item.models });
        });

        return arrRetorno;
    }

    /**
     * Retorna um array objetos de marcas / modelos, conforme ordenação solicitada no atributo quantidade de modelos por marca
     * 
     * @param {array} arrDados 
     * @param {string} ordenacao 
     */
    ordenarPorQtdeModelos(arrDados, ordenacao) {
        if (ordenacao === 'asc') {
            arrDados.sort((a, b) => { return a.qtde - b.qtde; });
        } else {
            arrDados.sort((a, b) => { return b.qtde - a.qtde; });
        }

        return arrDados;
    }

    /**
     * Ordena o array pela quantidade de modelos (ASC|DESC) seguido da marca (ASC)
     * Lógica de ordenação que tomei como base: 
     * https://github.com/trepichio/DIOBootcampNodejs-Desafios/blob/master/03-Ordena%C3%A7%C3%A3o%20e%20Filtros%20em%20JavaScript/Desafio-03.js
     * 
     * @param {array} arrDados 
     * @param {string} ordenacao 
     * @returns array
     */
    ordenarPorQtdeAndMarca(arrDados, ordenacao) {
        if (ordenacao === 'desc') {
            arrDados.sort((a, b) => {
                for (let [testCase, sortCase] of [
                    [a.qtde < b.qtde, 1],
                    [a.qtde > b.qtde, -1],
                    [a.marca > b.marca, 1],
                    [a.marca < b.marca, -1],
                ]) {
                    if (testCase) return sortCase;
                }
            });
        } else {
            arrDados.sort((a, b) => {
                for (let [testCase, sortCase] of [
                    [a.qtde > b.qtde, 1],
                    [a.qtde < b.qtde, -1],
                    [a.marca > b.marca, 1],
                    [a.marca < b.marca, -1],
                ]) {
                    if (testCase) return sortCase;
                }
            });
        }

        return arrDados;
    }
}

export default new MarcaService();