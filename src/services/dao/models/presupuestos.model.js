import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const presupuestosCollection = "presupuestos";
const presupuestosSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    // required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: "admin",
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
