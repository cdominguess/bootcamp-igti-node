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

/**
 * Arredonda um valor passado
 * @param {decimal} valor 
 * @returns 
 */
function arredondarValor(valor) {
    const precisao = 100;
    const vlrArredondado = Math.round((valor + Number.EPSILON) * precisao) / precisao;

    return vlrArredondado;
}

/**
 * Calcula as prestações dado um montante passado
 * @param {decimal} montante 
 * @param {integer} numParcelas 
 * @returns 
 */
function calcularPrestacoes(montante, numParcelas) {
    const vlrParcela = montante / numParcelas;
    const parcelaBase = arredondarValor(vlrParcela);
    const vlrTotalPrestacoes = parcelaBase * numParcelas;
    //console.log('valor montante: ' + montante + ' - num parcelas: ' + numParcelas);
    //console.log('valor por parcela sem arredondar: ' + vlrParcela + ' - valor da parcela arredondado: ' + parcelaBase);
    //console.log('valor parcela base X parcelas: ' + vlrTotalPrestacoes);

    const resultado = Array(numParcelas).fill(parcelaBase);
    
    // Se der diferença entre a soma das prestações e o montante, calcula a diferença para a primeira parcela
    //console.log('resultado antes: ', resultado);
    if (vlrTotalPrestacoes != montante) {
        resultado[0] = arredondarValor(resultado[0] + (montante - vlrTotalPrestacoes));
    }
    //console.log('resultado depois: ', resultado);

    return resultado;
}

module.exports = {
    calcularMontante,
    arredondarValor,
    calcularPrestacoes
};
