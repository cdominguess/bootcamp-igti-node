function Retangulo(altura, largura) {
  
  this.altura = altura;
  this.largura = largura;
  
  this.area = function () {
    return this.altura * this.largura;
  };
}

var r1 = new Retangulo(3, 4);
r1.area(); // this é r1

var areaFunc = r1.area;

areaFunc(); // problema, this é o objeto global

var areaFuncR1 = areaFunc.bind(r1);

areaFuncR1(); // this é r1
