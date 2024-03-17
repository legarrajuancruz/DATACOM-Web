import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const presupuestosCollection = "presupuestos";
const presupuestosSchema = new mongoose.Schema({
  orden: {
    type: String,
    required: true,
  },
  fecha: {
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
  nombre: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: "admin",
  },
  procesador: {
    type: String,
    required: false,
  },
  placamadre: {
    type: String,
    required: false,
  },
  memoria: {
    type: String,
    required: false,
  },
  disco: {
    type: String,
    required: false,
  },
  gabinete: {
    type: String,
    required: false,
  },
  monitor: {
    type: String,
    required: false,
  },
  accesorios: {},
});

presupuestosSchema.plugin(mongoosePaginate);

export const PresupuestosModel = mongoose.model(
  presupuestosCollection,
  presupuestosSchema
);
