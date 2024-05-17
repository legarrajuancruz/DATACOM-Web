import { Router } from "express";
import PresupuestosController from "../controllers/presupuestos.controller.js";
import { uploader } from "../utils.js";

const presupuestosRouter = Router();

//LEER
presupuestosRouter.get("/", PresupuestosController.getPresupuesto);

//VISTA ADMIN DE PRESUPUESTO SELECCIONADO
presupuestosRouter.get(
  "/:id/view",
  PresupuestosController.ControlViewPresupuestoById
);

//LEER ID
presupuestosRouter.get("/:id", PresupuestosController.getPresupuestoById);

//CREAR
presupuestosRouter.post("/", PresupuestosController.addPresupuesto);

//ELIMINAR
presupuestosRouter.delete("/:id", PresupuestosController.deletePresupuesto);

//MODIFICAR
presupuestosRouter.put(
  "/:id",
  uploader.single("img"),
  PresupuestosController.modPresupuesto
);

export default presupuestosRouter;
