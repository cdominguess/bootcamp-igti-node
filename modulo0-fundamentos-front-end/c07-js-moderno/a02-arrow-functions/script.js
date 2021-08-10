function soma(a, b) {
  return a + b;
}

function Retangulo(altura, largura) {
  this.altura = altura;
  this.largura = largura;
  this.area = function () {
    return this.altura * this.largura;
  };
}

// Código com arrow function

var somaV2 = (a, b) => a + b;

function RetanguloV2(altura, largura) {
  this.altura = altura;
  this.largura = largura;
  this.area = () => this.altura * this.largura;
}

var r1 = new RetanguloV2(5, 6);

var imprimeMensagem = () => console.log("teste");
