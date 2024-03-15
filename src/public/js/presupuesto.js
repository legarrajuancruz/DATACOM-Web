/*************************\
|      FORMATO MONEDA     |
\*************************/
function formatCurrency(input) {
  // Convertir input a cadena de texto si no lo es
  input = String(input);

  // Eliminar caracteres no numéricos
  let cleanedInput = input.replace(/\D/g, "");

  // Dar formato al valor como moneda en Argentina
  let formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });

  // Obtener el número limpio
  let number = Number(cleanedInput);

  // Devolver el valor formateado con separador de miles
  return formatter.format(number);
}

/********************************\
|      QUITAR FORMATO MONEDA     |
\********************************/
function unformatCurrency(input) {
  // Convertir input a cadena de texto si no lo es
  input = String(input);

  // Eliminar caracteres no numéricos y el símbolo de moneda
  let cleanedInput = input.replace(/[^0-9,]/g, "");

  // Convertir el valor a número
  let number = parseFloat(cleanedInput.replace(/,/g, "."));

  // Devolver el valor numérico sin formato
  return number;
}

/************************\
|      AGREGAR FILA      |
\************************/
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

        if (i == 0) {
          newInput.setAttribute("value", "1");
          newCell.appendChild(newInput);
        }
        if (i == 1) {
          newInput.setAttribute("class", "w-100");

          newCell.appendChild(newInput);
        }

        if (i == 2) {
          let newSelect = document.createElement("select");
          newSelect.setAttribute("name", "Garantia");
          newSelect.setAttribute("style", "font-size: 16px;");
          newSelect.setAttribute("class", "text-center w-100");
          newSelect.setAttribute("id", "procesadorGarantia");

          // Crear las opciones para el select
          for (let index = 1; index <= 3; index++) {
            let optionCell = document.createElement("option");
            optionCell.setAttribute("value", index);
            if (index <= 1) {
              optionCell.setAttribute("selected", "selected");
              optionCell.textContent = index + " Año";
              newSelect.appendChild(optionCell);
            }
            if (index > 1) {
              optionCell.textContent = index + " Años";
              newSelect.appendChild(optionCell);
            }
          }

          // Agregar el select al nuevo td
          newCell.appendChild(newSelect);
        }
        if (i == 3) {
          let contadoId =
            "accesorios" + (tbody.children.length + 1) + "Contado";
          newInput.setAttribute("id", contadoId); // Establecer el ID al input
          newCell.appendChild(newInput);
        }
        if (i == 4) {
          let listaId = "accesorios" + (tbody.children.length + 1) + "Plista";
          newCell.setAttribute("id", listaId);
          newCell.setAttribute(
            "style",
            "font-size: 14px; background-color:white;"
          );
          newCell.setAttribute(
            "class",
            "text-center text-dark align-middle border"
          );
        }

        // Agregar el td a la fila
        newRow.appendChild(newCell);
      }

      // Agregar la fila al final del cuerpo de la tabla
      tbody.appendChild(newRow);

      // Llamar a la función para agregar eventos a los campos de texto de la columna "Contado"
      agregarEventoInput();

      // Agregar evento de entrada a los nuevos campos de texto de la columna "Contado" en la fila recién agregada
      let newInputs = newRow.querySelectorAll("td:nth-child(5) input");
      newInputs.forEach((input) => {
        input.addEventListener("input", function () {
          calcularPreciosLista();
        });
      });

      // Recalcular la suma de la columna "Contado"
      calcularTotalContado();

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

/*************************\
|    CLICK NUEVA FILA     |
\*************************/
document
  .getElementById("agregar-columna")
  .addEventListener("click", async function () {
    try {
      if (document.getElementById("accesorios9Plista")) {
        return;
      }
      await agregarNuevaFila();
    } catch (error) {
      console.error("Error al agregar nueva fila:", error);
    }
  });

/***************************\
|    CLICK ELIMINAR FILA    |
\***************************/
document
  .getElementById("quitar-columna")
  .addEventListener("click", async function () {
    try {
      await eliminarUltimaFila();
    } catch (error) {
      console.error("Error al eliminar última fila:", error);
    }
  });
agregarEventoInput();

/*****************\
|       SUMA      |
\*****************/
document.getElementById("totalContado").textContent = formatCurrency(0);

// Función para calcular el total de la columna "Contado"
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
      totalContado += parseFloat(unformatCurrency(contadoInput.value)) || 0;
    }
  });

  // Mostrar el total en el casillero deseado
  let totalContadoCell = document.getElementById("totalContado");
  if (totalContadoCell) {
    totalContadoCell.textContent = formatCurrency(totalContado.toFixed(0));
  }
}

// Función para agregar evento de entrada a los campos de texto de la columna "Contado"
function agregarEventoInput() {
  let contadoInputs = document.querySelectorAll(
    "#componentes-table tbody tr td:nth-child(5) input"
  );
  contadoInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      // Llamar a la función para calcular el total de la columna "Contado"
      calcularTotalContado();
    });
  });
}

/*****************************\
|       SUMA PRECIO LISTA      |
\*****************************/
function calcularTotalPlista() {
  let totalPlista = 0;

  // Obtener todas las filas de la tabla
  let rows = document.querySelectorAll("#componentes-table tbody tr");

  rows.forEach(function (row) {
    // Obtener el valor del precio de lista en la columna correspondiente de la fila actual
    let precioListaCell = row.querySelector("td:nth-child(6)");

    if (precioListaCell) {
      // Convertir el valor a número y sumarlo al total
      totalPlista +=
        parseFloat(unformatCurrency(precioListaCell.textContent)) || 0;
    }
  });

  // Mostrar el total en el casillero deseado
  let totalPlistaCell = document.getElementById("totalPlista");
  if (totalPlistaCell) {
    totalPlistaCell.textContent = formatCurrency(totalPlista.toFixed(0));
  }
}

// Evento de entrada en los campos de texto de la columna "Contado"
function agregarEventoInput() {
  let contadoInputs = document.querySelectorAll(
    "#componentes-table tbody tr td:nth-child(5) input"
  );

  contadoInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      // Formatear el valor mientras el usuario lo ingresa
      input.value = formatCurrency(unformatCurrency(input.value));
      // Llamar a la función para calcular el total de la columna "Contado"
      calcularTotalContado();
    });
    // Formatear el valor inicial
    input.value = formatCurrency(unformatCurrency(input.value));
  });
}

// Observar cambios en el DOM para calcular automáticamente el total de la columna "Precio de Lista"
const observer = new MutationObserver(function () {
  calcularTotalPlista();
});

// Configurar el observador para que observe cambios en el contenido de la tabla
const config = { childList: true, subtree: true };
observer.observe(document.getElementById("componentes-table"), config);

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

/************************\
|   TOTAL PRECIO LISTA   |
\***********************/
// Función para calcular y mostrar los precios de lista en toda la columna "Precio de Lista"
function calcularPreciosLista() {
  // Obtener todas las filas de la tabla
  let rows = document.querySelectorAll("#componentes-table tbody tr");

  // Iterar sobre las filas
  rows.forEach(function (row) {
    // Obtener el precio contado de la fila actual
    let contadoInput = row.querySelector("td:nth-child(5) input");

    if (contadoInput) {
      // Obtener el valor del precio contado
      let contadoValue = parseFloat(unformatCurrency(contadoInput.value)) || 0;

      // Calcular el precio de lista multiplicando por 1.4
      let precioLista = contadoValue * 1.4;

      // Obtener el elemento td correspondiente al precio de lista en la misma fila
      let precioListaCell = row.querySelector("td:nth-child(6)");
      if (precioListaCell) {
        // Actualizar el contenido del elemento td de precio de lista con el nuevo valor
        precioListaCell.textContent = formatCurrency(precioLista.toFixed(0)); // Ajuste: Redondear sin decimales
      }
    }
  });

  // Después de recalcular los precios de lista, también recalculamos el total de precios de lista
  calcularTotalPlista();
}

// Función para agregar evento de entrada a los campos de texto de la columna "Contado"
function agregarEventoContado() {
  let contadoInputs = document.querySelectorAll(
    "#componentes-table tbody tr td:nth-child(5) input"
  );

  contadoInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      input.value = formatCurrency(unformatCurrency(input.value));
      calcularTotalContado();
      calcularPreciosLista();
      calcularPrecioDolarBillete();
    });
    input.value = formatCurrency(unformatCurrency(input.value));
  });
}

/*******************\
|   DOLAR OFICIAL   |
\*******************/

fetch("https://dolarapi.com/v1/dolares/oficial")
  .then((response) => response.json())
  .then((data) => {
    const valorDolarOficial = data.venta;

    const valorFormateado = parseFloat(valorDolarOficial).toLocaleString(
      "es-AR",
      {
        style: "currency",
        currency: "ARS",
      }
    );
    document.getElementById("dolarOficial").innerText = valorFormateado;
  })
  .catch((error) => {
    console.error("Error al obtener el valor del dólar oficial:", error);
  });

/*****************\
|   DOLAR BLUE   |
\****************/

document.getElementById("totalDolarBillete").textContent = formatCurrency(0);

async function obtenerDolarBlue() {
  try {
    const response = await fetch("https://dolarapi.com/v1/dolares/blue");
    const data = await response.json();
    const valorDolarBlue = data.venta;
    return valorDolarBlue;
  } catch (error) {
    console.error("Error al obtener el valor del dólar blue:", error);
    return null;
  }
}

async function calcularPrecioDolarBillete() {
  try {
    // Obtener el total en pesos argentinos
    let totalContado = document.getElementById("totalContado").textContent;
    let unformattedTotal = unformatCurrency(totalContado);

    // Obtener el valor del dólar blue
    const valorDolarBlue = await obtenerDolarBlue();

    // Verificar si se obtuvo un valor válido para el dólar blue
    if (
      valorDolarBlue !== null &&
      valorDolarBlue !== undefined &&
      valorDolarBlue !== 0
    ) {
      // Calcular el precio en dólares billete
      let precioDolarBillete = unformattedTotal / valorDolarBlue;

      // Formatear el precio en dólares billete y mostrarlo en el elemento HTML
      let formattedPrice = formatCurrency(precioDolarBillete.toFixed(1));
      document.getElementById("totalDolarBillete").innerText = formattedPrice;
    } else {
      // Si no se pudo obtener el valor del dólar blue o es cero, mostrar un mensaje de error
      console.error("No se pudo obtener el valor válido del dólar blue.");
    }
  } catch (error) {
    console.error("Error al calcular el precio en dólares billete:", error);
  }
}

/****************\
|   EVENTOS      |
\****************/
function agregarEventoInput() {
  let contadoInputs = document.querySelectorAll(
    "#componentes-table tbody tr td:nth-child(5) input"
  );

  contadoInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      input.value = formatCurrency(unformatCurrency(input.value));
      calcularTotalContado();
      calcularPreciosLista();
      calcularPrecioDolarBillete();
    });
    input.value = formatCurrency(unformatCurrency(input.value));
  });
}
agregarEventoContado();

/*********************\
|    GUARDAR DATOS    |
\*********************/
const guardardatos = async () => {
  let procesador = document.getElementById("procesadorContado").value;
  let motherboard = document.getElementById("placamadreContado").value;
  let memoria = document.getElementById("memoriaContado").value;
  let disco = document.getElementById("discoContado").value;
  let gabinete = document.getElementById("gabineteContado").value;
  let monitor = document.getElementById("monitorContado").value;
  let accesorios1 = "";
  let accesorios2 = "";
  let accesorios3 = "";

  let componentes = [
    { procesador: procesador },
    { motherboard: motherboard },
    { memoria: memoria },
    { disco: disco },
    { gabinete: gabinete },
    { monitor: monitor },
  ];

  for (let i = 7; i < 10; i++) {
    if (
      document.getElementById(`accesorios${i}Contado`) ==
      document.getElementById("accesorios7Contado")
    ) {
      accesorios1 = document.getElementById(`accesorios${i}Contado`).value;
      componentes.push({ accesorios1: accesorios1 });
    }
    if (
      document.getElementById(`accesorios${i}Contado`) ==
      document.getElementById("accesorios8Contado")
    ) {
      accesorios2 = document.getElementById(`accesorios${i}Contado`).value;
      componentes.push({ accesorios2: accesorios2 });
    }
    if (
      document.getElementById(`accesorios${i}Contado`) ==
      document.getElementById("accesorios9Contado")
    ) {
      accesorios3 = document.getElementById(`accesorios${i}Contado`).value;
      componentes.push({ accesorios3: accesorios3 });
    }
  }

  console.log(componentes);
};

document.getElementById("crearPresupuesto").onclick = guardardatos;
