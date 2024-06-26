/*==============================
  -      BORRAR DESDE BOTON     -
  =============================*/
function eliminarPresupuesto(id) {
  console.log(id);
  fetch(`/api/presupuesto/${id}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error de red: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      alert("Preupuesto eliminado con éxito", data);
      location.href = "/modificarPresupuesto";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/*==================================
    -      NUEVO ESTADO DESDE BOTON     -
    ================================*/
function guardarNuevoEstado(id) {
  const form = document.getElementById(`form_${id}`);
  const select = document.getElementById(`estadoSelect_${id}`);
  const selectedValue = select.value;

  const requestBody = {
    estado: select.value,
  };

  fetch(`/api/presupuesto/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(requestBody),
  }).then((result) => {
    if (result.status === 201) {
      alert("Estado actualizado con éxito");
      location.href = "/modificarPresupuesto";
    }
    if (result.status === 400) {
      alert("No puede cambiar este estado");
      location.href = "/modificarPresupuesto";
    }
  });
}

/*======================================
    -      VISTA PREVIA PRESUPUESTO     -
    ===================================*/
function verPresupuesto(id) {
  location.href = `/api/presupuestos/${id}/view`;
}
