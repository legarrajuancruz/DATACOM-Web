import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const presupuestosCollection = "presupuestos";

const ComponenteSchema = new mongoose.Schema({
  cantidad: { type: String, default: "1" },
  descripcion: { type: String, default: "" },
  garantia: { type: String, default: "1" },
  contado: { type: Number, default: 0 },
  plista: { type: Number, default: 0 },
});

const presupuestosSchema = new mongoose.Schema({
  orden: {
    type: Number,
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  oficial: {
    type: Number,
    required: true,
  },
  blue: {
    type: Number,
    required: true,
  },
  procesador: ComponenteSchema,
  motherboard: ComponenteSchema,
  memoria: ComponenteSchema,
  disco: ComponenteSchema,
  gabinete: ComponenteSchema,
  monitor: ComponenteSchema,
  accesorios7: ComponenteSchema,
  accesorios8: ComponenteSchema,
  accesorios9: ComponenteSchema,
  accesorios10: ComponenteSchema,
  accesorios11: ComponenteSchema,
  accesorios12: ComponenteSchema,
  accesorios13: ComponenteSchema,
  accesorios14: ComponenteSchema,
});

presupuestosSchema.plugin(mongoosePaginate);

export const PresupuestosModel = mongoose.model(
  presupuestosCollection,
  presupuestosSchema
);
