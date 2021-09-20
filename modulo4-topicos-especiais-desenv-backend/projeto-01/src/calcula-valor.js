/**
 * Calcula o montante sobre um capital, aplicando uma taxa de juros composto em N parcelas
 * @param {decimal} capital
 * @param {decimal} taxa
 * @param {integer} parcelas
 * @returns
 */
function calcularMontante(capital, taxa, parcelas) {
    /*
     * Montante = C * (1 + i) ^ n
     *
     * C = Valor inicial
     * 1 = Significa o 100% do capital inicial
     * i = taxa de juros composto
     * n = tempo de aplicação do juros
     */

    // Porque se for somente UMA parcela não haverá juros
    const parcelasAux = (parseInt(parcelas) === 1) ? parcelas - 1 : parcelas;
    const montante = capital * Math.pow((1 + taxa), parcelasAux);

    return arredondarValor(montante);
}

function arredondarValor(valor) {
    const precisao = 100;
    const vlrArredondado = Math.round(valor * precisao) / precisao;

    return vlrArredondado;
}

module.exports = {
    calcularMontante,
    arredondarValor
};
