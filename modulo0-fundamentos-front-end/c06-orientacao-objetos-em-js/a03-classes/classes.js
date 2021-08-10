
class Retangulo {
  constructor(altura, largura) {
    this.altura = altura;
    this.largura = largura;
  }

  area() {
    return this.altura * this.largura;
  }

  imprimeNome() {
    console.log('Retangulo');
  }
}

class Quadrado extends Retangulo {
  constructor(dimensao) {
    super(dimensao, dimensao);
  }

  imprimeNome() {
    console.log('Quadrado');
  }
}

var r1 = new Retangulo(3, 4);
var r2 = new Retangulo(3, 8);
r2.imprimeNome();

var r3 = new Quadrado(3);
r3.imprimeNome();


