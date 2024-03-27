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

const accesoriosSchema = {
  type: [ComponenteSchema],
  default: [],
};

const accesoriosDynamicSchema = {};

for (let i = 7; i <= 13; i++) {
  accesoriosDynamicSchema[`accesorios${i}`] = accesoriosSchema;
}

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
    required: false,
  },
  procesador: ComponenteSchema,
  motherboard: ComponenteSchema,
  memoria: ComponenteSchema,
  disco: ComponenteSchema,
  gabinete: ComponenteSchema,
  monitor: ComponenteSchema,
  accesorios: accesoriosDynamicSchema,
});

presupuestosSchema.plugin(mongoosePaginate);

export const PresupuestosModel = mongoose.model(
  presupuestosCollection,
  presupuestosSchema
);
