var caixa = document.getElementById("caixa");
var cx, cy;

function setPos(x, y) {
  caixa.style.left = x + "px";
  caixa.style.top = y + "px";
}

caixa.addEventListener("mousedown", iniciaArraste);
document.addEventListener("mouseup", terminaArraste);


function iniciaArraste(evt) {
  cx = evt.clientX - pxParaNum(caixa.style.left);
  cy = evt.clientY - pxParaNum(caixa.style.top);
  caixa.classList.add("arrastando");
  document.addEventListener("mousemove", arrasta);
}

function terminaArraste(evt) {
  caixa.classList.remove("arrastando");
  document.removeEventListener("mousemove", arrasta);
}

function arrasta(evt) {
  var x = evt.clientX;
  var y = evt.clientY;
  setPos(x - cx, y - cy);
}

function pxParaNum(s) {
  return +(s.replace("px", ""));
}