var n1 = document.getElementById('n1');
var n2 = document.getElementById('n2');
var r = document.getElementById('r');

document.addEventListener('input', function() {
  var resultado = n1.valueAsNumber + n2.valueAsNumber;
  r.textContent = isNaN(resultado) ? '' : resultado;
});
