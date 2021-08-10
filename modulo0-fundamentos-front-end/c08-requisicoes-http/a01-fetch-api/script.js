
function solucao1() {
  let employeesPromise = fetch("http://localhost:3000/roles");
  employeesPromise.then((resp) => {
    resp.json().then((employees) => {
      let table = renderTable(employees);
      document.getElementById("app").innerHTML = table;
    });
  });
}
//solucao1();

function solucao2() {
  let objPromise = new Promise((resolve, reject) => {
    jQuery.ajax({
      url: 'http://127.0.0.1:3000/roles',
      dataType: 'json',
      success: function(res) {
        resolve(res);
      },
      error: function(err) { 
        reject(err);
      }
    });
  });

  objPromise.then((res) => {
    let table = renderTable(res);
      document.getElementById("app").innerHTML = table;
      setTimeout(() => {
        let strApp = document.getElementById("app").innerHTML;
        document.getElementById("app").innerHTML = strApp + "<hr>Finalizado!";
      }, 3000);
  }).catch((err) => {
    console.log(err);
    document.getElementById("app").innerHTML = "ERRO: " + err.statusText;
  });
}
solucao2();

function renderTable(employees) {
  let rows = employees.map(employee => {
    return `<tr><td>${employee.id}</td><td>${employee.name}</td></tr>`;
  });
  return `<table>${rows.join("")}</table>`;
}