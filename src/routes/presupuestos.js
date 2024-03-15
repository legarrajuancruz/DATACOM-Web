import { Router } from "express";
import PresupuestosController from "../controllers/presupuestos.controller.js";
import { uploader } from "../utils.js";

const presupuestosRouter = Router();

//LEER
presupuestosRouter.get("/", PresupuestosController.getProduct);

//LEER ID
presupuestosRouter.get("/:id", PresupuestosController.getProductById);

//CREAR
presupuestosRouter.post(
  "/",
  uploader.single("img"),
  PresupuestosController.addProduct
);

//ELIMINAR
presupuestosRouter.delete("/:id", PresupuestosController.deleteProduct);

//MODIFICAR
presupuestosRouter.put(
  "/:id",
  uploader.single("img"),
  PresupuestosController.modProduct
);

export default PresupuestosController;
