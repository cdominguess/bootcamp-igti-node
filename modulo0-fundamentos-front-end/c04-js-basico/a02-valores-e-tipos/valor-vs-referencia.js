console.log('cópia por valor vs. referência');

var primitivo1 = 1;
var primitivo2 = primitivo1; // cópia o valor
primitivo2 = 2;

console.log(primitivo1); // imprime 1
console.log(primitivo2); // imprime 2

var objeto1 = { x: 1 };
var objeto2 = objeto1; // cópia a referência
objeto2.x = 2;

console.log(objeto1.x); // imprime 2
console.log(objeto2.x); // imprime 2
