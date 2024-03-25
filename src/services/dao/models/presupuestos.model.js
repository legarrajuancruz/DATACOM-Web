import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const presupuestosCollection = "presupuestos";
const presupuestosSchema = new mongoose.Schema({
  orden: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
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
  procesador: {
    type: String,
    required: true,
  },
  motherboard: {
    type: String,
    required: true,
  },
  memoria: {
    type: String,
    required: true,
  },
  disco: {
    type: String,
    required: true,
  },
  gabinete: {
    type: String,
    required: true,
  },
  monitor: {
    type: String,
    required: true,
  },
  accesorios: {
    type: [String],
    default: [],
  },
});

presupuestosSchema.plugin(mongoosePaginate);

export const PresupuestosModel = mongoose.model(
  presupuestosCollection,
  presupuestosSchema
);
