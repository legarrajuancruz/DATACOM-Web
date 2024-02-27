document
  .getElementById("agregar-columna")
  .addEventListener("click", function () {
    // Obtener el cuerpo de la tabla
    let tbody = document
      .getElementById("componentes-table")
      .getElementsByTagName("tbody")[0];

    // Crear un nuevo tr (fila)
    let newRow = document.createElement("tr");

    // Crear el primer td con el estilo y texto específicos
    let firstCell = document.createElement("td");
    firstCell.setAttribute(
      "style",
      "background: rgba(166, 166, 166, 0.721); font-size: 12px"
    );
    firstCell.setAttribute("class", "text-center");
    firstCell.textContent = "ACCESORIOS";

    // Agregar el primer td a la fila
    newRow.appendChild(firstCell);

    // Crear los cinco td restantes con sus respectivos input
    for (let i = 0; i < 5; i++) {
      // Crear el td
      let newCell = document.createElement("td");

      // Crear el input
      let newInput = document.createElement("input");
      newInput.setAttribute("class", "text-center w-100");
      if (i == 1) {
        newInput.setAttribute("class", " w-100");
        newCell.appendChild(newInput);
      }

      // Agregar el input al td
      newCell.appendChild(newInput);

      // Agregar el td a la fila
      newRow.appendChild(newCell);
    }

    // Agregar la fila al final del cuerpo de la tabla
    tbody.appendChild(newRow);
  });

document
  .getElementById("quitar-columna")
  .addEventListener("click", function () {
    // Obtener el cuerpo de la tabla
    let tbody = document.querySelector("#componentes-table tbody");

    // Obtener la última fila
    let lastRow = tbody.lastChild;

    // Verificar si la última fila existe y si el siguiente elemento no es un td
    if (lastRow && lastRow.firstChild.textContent === "ACCESORIOS") {
      // Eliminar la última fila
      tbody.removeChild(lastRow);
    }
  });
