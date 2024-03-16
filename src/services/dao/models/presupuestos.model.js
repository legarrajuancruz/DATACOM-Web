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
  price: {
    type: Number,
    required: true,
  },
  oficial: {
    type: Number,
    required: true,
  },
  blue: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    // required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: "admin",
  },
  procesador: {
    type: Number,
    required: true,
  },
  placamadre: {
    type: Number,
    required: true,
  },
  memoria: {
    type: Number,
    required: true,
  },
  disco: {
    type: Number,
    required: true,
  },
  gabinete: {
    type: Number,
    required: true,
  },
  monitor: {
    type: Number,
    required: true,
  },
});

presupuestosSchema.pre("findOne", function () {
  this.populate({
    path: "owner",
    select: "_id role",
  });
});

presupuestosSchema.plugin(mongoosePaginate);

export const PresupuestosModel = mongoose.model(
  presupuestosCollection,
  presupuestosSchema
);
