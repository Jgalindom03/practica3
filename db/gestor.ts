import mongoose from "npm:mongoose@7.6.3";
import { Gestor } from "../type.ts";


const Schema = mongoose.Schema;

const GestorSchema = new Schema(
  {
    name:{type:String, required:true},
    clientes:{type:[mongoose.Schema.Types.ObjectId], ref:"Cliente", required: true, validate:[ function(cliente){ return cliente.length <10;}, 'Un gestor puede tener 10 clientes solo.'] },
  },
  { timestamps: false }
);


export type GestorModelType = mongoose.Document & Omit<Gestor, "id" | "clientes"> & {
  clientes : Array<mongoose.Schema.Types.ObjectId>;
};

export const GestorModel = mongoose.model<GestorModelType>("Gestor", GestorSchema)