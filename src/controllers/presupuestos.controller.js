import {
  productService,
  userService,
  presupuestoService,
} from "../services/factory.js";
import mongoose from "mongoose";
import EErrors from "../services/errors/errors-enum.js";
import CustomError from "../services/errors/CustomError.js";
import {
  generatePresupuestosErrorInfo,
  eliminatePresupuestoErrorInfo,
  getPresupuestoByIdErrorInfo,
} from "../services/errors/messages/presupuestos-creation-error.js";

//CREAR
const addPresupuesto = async (req, res) => {
  try {
    console.log("ENVIO ARCHIVO");
    console.log(req.file);

    const producto = {
      orden: Number(req.body.orden),
      fecha: req.body.fecha,
      dolar: Number(req.body.dolar),
      stock: Number(req.body.stock),
      category: req.body.category,
      img: `/products/${req.file.filename}`,
      owner: req.body.owner,
    };
    console.log("VER PRODUCTO ENVIADO");
    console.log(producto);

    if (
      !producto.title ||
      typeof producto.price !== "number" ||
      !producto.stock
    ) {
      CustomError.createError({
        name: "Product creation error",
        cause: generatePresupuestosErrorInfo(producto),
        message: "Error creando el producto",
        code: EErrors.INVALID_TYPES_ERROR,
      });
      res.status(400).send({
        error: "Incompleto",
        result: "Producto no pudo ser creado",
        producto: producto,
      });
    }

    let proudctoCreado = await presupuestoService.crearPresupuesto(producto);
    console.log("Nuevo Producto Creado");
    console.log(proudctoCreado);

    res.status(201).send({
      result: "Producto creado con exito",
      producto: proudctoCreado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error.code,
      message: error.message,
    });
  }
};

//LEER
const getPresupuesto = async (req, res) => {
  try {
    let products = await presupuestoService.leerProductos(req.query);

    res.status(200).send({
      result: "Productos obtenidos con exito",
      Productos: products,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: error, message: "No se pudo obtener el producto." });
  }
};

//LEER ID
const getPresupuestoById = async (req, res) => {
  try {
    let _id = req.params.id;

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      CustomError.createError({
        name: "Product Get error",
        cause: getProductByIdErrorInfo(_id),
        message: "Error al obtener el producto",
        code: EErrors.NI_EL_PROGRAMADOR_SABE_QUE_PASO,
      });
    }

    let producto = await PresupuestoService.getProductbyId({ _id });

    res.status(202).send({
      result: "Producto obtenido con exito",
      producto: producto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error.code,
      message: error.message,
    });
  }
};

//ELIMINAR
const deletePresupuesto = async (req, res) => {
  try {
    let { _id, uid } = req.body;

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      throw CustomError.createError({
        name: "Product elimination error",
        cause: eliminateProductsErrorInfo(_id),
        message: "Error al eliminar el producto",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }

    let find = await productService.getProductbyId(_id);
    let user = await userService.getUserByID(uid);

    if (user.role === "premium" && find.owner.role === "premium") {
      await productService.borrarProducto(find._id);
      const response = await userService.sendNotificationProductErased(
        user.email
      );
      if (response === "true") {
        console.log("EMAIL ENVIADO");
      } else {
        console.log("EMAIL NO ENVIADO");
      }

      res.status(202).send({
        result: "Producto eliminado con exito",
        payload: find,
      });
    } else if (user.role === "admin") {
      if (find.owner.role === "premium") {
        const response = await userService.sendNotificationProductErased(
          user.email
        );
        if (response === "true") {
          console.log("EMAIL ENVIADO");
        } else {
          console.log("EMAIL NO ENVIADO");
        }
      }
      await productService.borrarProducto(find._id);

      res.status(203).send({
        result: "Producto eliminado por ADMIN con exito",
        payload: find,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error.code,
      message: error.message,
    });
  }
};

//MODIFICAR
const modPresupuesto = async (req, res) => {
  try {
    const productUpdated = {
      title: req.body.title,
      description: req.body.description,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      category: req.body.category,
      img: `/products/${req.file.filename}`,
      owner: req.body.owner,
    };

    let productoActualizado = await productService.actualizarProducto(
      req.params.id,
      productUpdated
    );

    res.status(202).send({
      result: "Producto modificado con exito",
      payload: productoActualizado,
    });
  } catch (error) {
    console.error("No se pudo actualizar el producto con mongoose:" + error);
    res.status(500).send({
      error: "No se pudo actualizar el producto con mongoose",
      message: error,
    });
  }
};

export default {
  addPresupuesto,
  getPresupuesto,
  getPresupuestoById,
  deletePresupuesto,
  modPresupuesto,
};
