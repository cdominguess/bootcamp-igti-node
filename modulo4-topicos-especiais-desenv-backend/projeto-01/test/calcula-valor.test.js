const calculaValor = require('../src/calcula-valor');

// Este describe serve para agrupar os testes no console
describe('Testes: calcularMontante', () => {
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
        const valorArredondado = calculaValor.arredondarValor(1.005);
        expect(valorArredondado).toBe(1.01);
    })
});
