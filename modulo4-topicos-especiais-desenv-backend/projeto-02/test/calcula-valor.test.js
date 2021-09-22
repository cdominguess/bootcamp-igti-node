const calculaValor = require('../src/calcula-valor');

// Este describe serve para agrupar os testes no console
describe('TESTES: calcularMontante', () => {
    test('Com 1 prestação o montante é igual ao capital', () => {
        // Dado (given) - dados tais valores
        const capital = 500;
        const taxa = 0.025;
        const parcelas = 1;

        // Quando (when) - Realiza a operação
        const montante = calculaValor.calcularMontante(capital, taxa, parcelas);

        // Então (then) - Testa o resultado ou comportamento esperado
        expect(montante).toBe(500);
    });

    test('Com 3 prestações o montante é acrescido de 2.5% de juros compostos', () => {
        // Dado (given) - dados tais valores
        const capital = 500;
        const taxa = 0.025;
        const parcelas = 3;

        // Quando (when) - Realiza a operação
        const montante = calculaValor.calcularMontante(capital, taxa, parcelas);

        // Então (then) - Testa o resultado ou comportamento esperado
        expect(montante).toBe(538.45);
    });
});

describe('TESTE: arredondarValor', () => {
    test('Arredondar o valor 538.4453124999998 parta obter 538.45', () => {
        // Given
        const valor = 538.4453124999998;

        // Then
        const valorArredondado = calculaValor.arredondarValor(valor);

        // When
        expect(valorArredondado).toBe(538.45);
    });

    test('Aredondar o valor 1.005 para obter 1.01', () => {
        const vlrArredondar = 1.005;
        
        const valorArredondado = calculaValor.arredondarValor(vlrArredondar);

        expect(valorArredondado).toBe(1.01);
    });
});

describe('TESTES: calcularPrestacoes', () => {
    test('O número de parcelas é igual ao número de prestações', () => {
        const vlrMontante = 200;
        const numPrestacoes = 6;
        
        const arrPrestacoes = calculaValor.calcularPrestacoes(vlrMontante, numPrestacoes);
        
        expect(arrPrestacoes.length).toBe(numPrestacoes);
    });

    test('Uma única prestação, o valor é igual ao montante', () => {
        const vlrMontante = 50;
        const numPrestacoes = 1;
        const arrPrestacoes = calculaValor.calcularPrestacoes(vlrMontante, numPrestacoes);

        expect(arrPrestacoes[0]).toBe(50);
    });

    test('Com duas prestações, o valor é igual a metade do montante', () => {
        const vlrMontante = 50;
        const numPrestacoes = 2;

        const arrPrestacoes = calculaValor.calcularPrestacoes(vlrMontante, numPrestacoes);

        expect(parseFloat(arrPrestacoes[0] + arrPrestacoes[1])).toBe(50);
    });

    test('O valor das soma das prestações deve ser igual ao montante com duas casas decimais', () => {
        const vlrMontante = 200;
        const numPrestacoes = 6;

        const arrPrestacoes = calculaValor.calcularPrestacoes(vlrMontante, numPrestacoes);

        expect(arrPrestacoes.length).toBe(numPrestacoes);
        
        const soma = calculaValor.arredondarValor(arrPrestacoes[0] + arrPrestacoes[1] + arrPrestacoes[2] + arrPrestacoes[3] + arrPrestacoes[4] + arrPrestacoes[5]);
        expect(soma).toBe(200);
    });
});
