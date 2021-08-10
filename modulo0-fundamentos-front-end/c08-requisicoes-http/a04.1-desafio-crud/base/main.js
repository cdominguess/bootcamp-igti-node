function fetchJson(url) {
  return fetch(url).then((r) => {
    if (r.ok) {
      return r.json();
    } else {
      throw new Error(r.statusText);
    }
  });
}

async function init() {
  try {
    let [employees, roles] = await Promise.all([
      fetchJson("http://localhost:3000/employees"),
      fetchJson("http://localhost:3000/roles"),
    ]);
    let table = renderTable(employees, roles);
    document.getElementById("app").innerHTML = table;
  } catch (erro) {
    showError(erro);
  }
}
init();

function renderTable(employees, roles) {
  let rows = employees.map((employee) => {
    let role = roles.find((role) => role.id == employee.role_id);
    return `<tr><td>${employee.id}</td><td>${employee.name}</td><td>${role.name}</td></tr>`;
  });
  return `<table>${rows.join("")}</table>`;
}

function showError(error) {
  document.getElementById("app").innerHTML = "Erro ao carregar dados.";
  console.error(error);
}

/*
// Criar
fetch(`http://localhost:3000/employees`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(employee),
});

// Atualizar
fetch(`http://localhost:3000/employees/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(employee),
});

// Excluir
fetch(`http://localhost:3000/employees/${id}`, {
  method: "DELETE",
});
*/
