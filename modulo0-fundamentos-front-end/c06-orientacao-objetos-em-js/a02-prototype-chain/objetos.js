function Retangulo(altura, largura) {
  this.altura = altura;
  this.largura = largura;

  this.area = function () {
    return this.altura * this.largura;
  };
}

var r1 = new Retangulo(3, 4);
var r2 = new Retangulo(7, 2);

console.log(r1.area());
console.log(r2.area());

function RetanguloV2(altura, largura) {
  this.altura = altura;
  this.largura = largura;
}
RetanguloV2.prototype.area = function () {
  return this.altura * this.largura;
};

var r3 = new RetanguloV2(3, 4);
var r4 = new RetanguloV2(7, 2);
