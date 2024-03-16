import { PresupuestosModel } from "../models/presupuestos.model.js";

export default class PresupuestoService {
  constructor() {
    console.log("Presupuestos with Database persistence in mongodb");
  }

  /*==============================
  -      CREAR NUEVO PRESUPUESTO    -
  ==============================*/
  createPresupuesto = async (productoNuevo) => {
    let presupuesto = await PresupuestosModel.create(productoNuevo);
    return presupuesto;
  };

  /*========================
  -      LEER PRESUPUESTO     -
  ==========================*/
  getPresupuestos = async () => {
    const presupuestos = await PresupuestosModel.find();
    return presupuestos;
  };

  /*=====================================
  -      LEER PRESUPUESTO CON PAGINATE     -
  ======================================*/
  leerPresupuestos = async (obj) => {
    let { limit, page, query, sort } = obj;

    limit = limit ? limit : 10;
    page = page ? page : 1;
    query = query || {};
    sort = sort ? (sort == "asc" ? 1 : -1) : 0;
    let presupuesto = await PresupuestosModel.paginate(query, {
      limit: limit,
      page: page,
      sort: { price: sort },
    });

    let status = presupuesto ? "success" : "error";

    let prevLink = presupuesto.hasPrevPage
      ? "http://localhost:8080/presupuesto?limit=" +
        limit +
        "&page=" +
        presupuesto.prevPage
      : null;

    let nextLink = presupuesto.hasNextPage
      ? "http://localhost:8080/presupuesto?limit=" +
        limit +
        "&page=" +
        presupuesto.nextPage
      : null;

    presupuestos = {
      status: status,
      payload: presupuesto.docs,
      totalPages: presupuesto.totalPages,
      prevPage: presupuesto.prevPage,
      nextPage: presupuesto.nextPage,
      page: presupuesto.page,
      hasPrevPage: presupuesto.hasPrevPage,
      hasNextPage: presupuesto.hasNextPage,
      prevLink: prevLink,
      nextLink: nextLink,
    };

    return presupuestos;
  };

  /*===============================
  -      LEER PRESUOUESTO POR ID     -
  ================================*/
  getPresupuestosbyId = async (id) => {
    const presupuesto = await PresupuestosModel.findById(id);
    return presupuesto;
  };

  /*========================
  -      BORRAR PRESUPUESTO    -
  ==========================*/
  borrarPresupuesto = async (id) => {
    const presupuesto = await PresupuestosModel.findById(id);
    console.log(presupuesto.owner.role);
    let presupuestoBorrado = await PresupuestosModel.deleteOne({ _id: id });
    return presupuestoBorrado;
  };

  /*================================
  -      ACTUALIZAR PRESUPUESTO     -
  ==============================*/
  actualizarPresupuesto = async (id, productUpdated) => {
    console.log(id, productUpdated);
    let productoActualizado = await PresupuestosModel.updateOne(
      { _id: id },
      productUpdated
    );
    return productoActualizado;
  };
}
