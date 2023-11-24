import mongoose from "npm:mongoose@7.6.3";
import { Hipoteca } from "../type.ts";


const Schema = mongoose.Schema;

const HipotecaSchema = new Schema(
  {
    cuotas:{ type:Number, required:true, default:20},
    clientes:{type:mongoose.Schema.Types.ObjectId, ref:"Cliente", required:true},
    gestores:{type:mongoose.Schema.Types.ObjectId, ref:'Gestor', required:true},
    dcompletado:{type:Number,required:false},
    dtotal:{type:Number,required:true}
},
  { timestamps: false }
);
export type HipotecaModelType = mongoose.Document & Omit<Hipoteca, "id" | "clientes" | "gestores"> & {
  clientes : mongoose.Schema.Types.ObjectId;
  gestores : mongoose.Schema.Types.ObjectId;
};
export const HipotecaModel = mongoose.model<HipotecaModelType>("Hipoteca", HipotecaSchema)