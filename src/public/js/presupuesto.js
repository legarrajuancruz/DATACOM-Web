// Agregar evento de entrada a todos los campos de texto de la columna "Contado"
function agregarEventoInput() {
  let contadoInputs = document.querySelectorAll(
    "#componentes-table tbody tr td:nth-child(5) input"
  );
  contadoInputs.forEach(function (input) {
    input.addEventListener("input", calcularTotalContado);
  });
}

// Función para agregar una nueva fila
async function agregarNuevaFila() {
  return new Promise((resolve, reject) => {
    try {
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
        }
        if (i == 0) {
          newCell.appendChild(newInput);
        }
        if (i == 1) {
          newInput.setAttribute("class", "w-100");
          newCell.appendChild(newInput);
        }
        if (i < 4) {
          newCell.appendChild(newInput);
        }
        if (i == 4) {
          newCell.setAttribute(
            "style",
            "font-size: 14px; background-color:white;"
          );
          newCell.setAttribute(
            "class",
            "text-center text-dark align-middle border"
          );
        }

        // Agregar el input al td
        newCell.appendChild(newInput);

        // Agregar el td a la fila
        newRow.appendChild(newCell);
      }

      // Agregar la fila al final del cuerpo de la tabla
      tbody.appendChild(newRow);

      // Agregar evento de entrada a los nuevos campos de texto de la columna "Contado"
      agregarEventoInput();

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

/************************\
|      ELIMINAR FILA     |
\************************/

function eliminarUltimaFila() {
  return new Promise((resolve, reject) => {
    try {
      // Obtener el cuerpo de la tabla
      let tbody = document.querySelector("#componentes-table tbody");

      // Obtener la última fila
      let lastRow = tbody.lastChild;

      // Verificar si la última fila existe y si el siguiente elemento no es un td
      if (lastRow && lastRow.firstChild.textContent === "ACCESORIOS") {
        // Eliminar la última fila
        tbody.removeChild(lastRow);
      }

      // Recalcular la suma de la columna "Contado"
      calcularTotalContado();

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

// Agregar evento de clic para agregar una nueva fila
document
  .getElementById("agregar-columna")
  .addEventListener("click", async function () {
    try {
      await agregarNuevaFila();
    } catch (error) {
      console.error("Error al agregar nueva fila:", error);
    }
  });

// Agregar evento de clic para eliminar la última fila
document
  .getElementById("quitar-columna")
  .addEventListener("click", async function () {
    try {
      await eliminarUltimaFila();
    } catch (error) {
      console.error("Error al eliminar última fila:", error);
    }
  });

// Llamar a la función para agregar el evento de entrada inicialmente
agregarEventoInput();

/*****************\
|       SUMA      |
\*****************/
// Función para calcular el total de la columna "Contado"
function calcularTotalContado() {
  let totalContado = 0;

  // Obtener todas las filas de la tabla
  let rows = document.querySelectorAll("#componentes-table tbody tr");
  rows.forEach(function (row) {
    // Obtener el valor del input en la columna "Contado" de la fila actual
    let contadoInput = row.querySelector("td:nth-child(5) input");
    if (contadoInput) {
      // Convertir el valor a número y sumarlo al total
      totalContado += parseFloat(contadoInput.value) || 0;
    }
  });

  // Mostrar el total en el casillero deseado
  let totalContadoCell = document.getElementById("totalContado");
  if (totalContadoCell) {
    totalContadoCell.textContent = totalContado.toFixed(1); // Redondear a 2 decimales
  }
}

/*****************\
|      FECHA      |
\*****************/
let fechaTd = document.getElementById("fecha");
let fechaActual = new Date();

let dia = fechaActual.getDate().toString().padStart(2, "0");
let mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
let anio = fechaActual.getFullYear();

let fechaFormateada = `${dia}/${mes}/${anio}`;
fechaTd.textContent = fechaFormateada;
