import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
import { uploader } from "../utils.js";

const ProductRouter = Router();

//LEER
ProductRouter.get("/", ProductController.getProduct);

//LEER ID
ProductRouter.get("/:id", ProductController.getProductById);

//CREAR
ProductRouter.post("/", uploader.single("img"), ProductController.addProduct);

//ELIMINAR
ProductRouter.delete("/:id", ProductController.deleteProduct);

//MODIFICAR
ProductRouter.put("/:id", uploader.single("img"), ProductController.modProduct);

export default ProductRouter;
