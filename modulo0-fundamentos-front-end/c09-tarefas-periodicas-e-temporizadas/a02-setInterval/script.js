const relogio = document.getElementById("relogio");
const btn = document.getElementById("btn");
let interval;

function inicia() {
  relogio.textContent = formataHora(new Date());
  interval = setInterval(() => {
    relogio.textContent = formataHora(new Date());
  }, 1000);
  btn.textContent = "Para relogio";
}
inicia();

function para() {
  clearInterval(interval);
  interval = undefined;
  btn.textContent = "Inicia relogio";
}

function iniciaOuPara() {
  if (interval) {
    para();
  } else {
    inicia();
  }
}

function formataHora(date) {
  const h = date.getHours().toString().padStart(2, "0"),
    m = date.getMinutes().toString().padStart(2, "0"),
    s = date.getSeconds().toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}
