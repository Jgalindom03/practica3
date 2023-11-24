import mongoose from "npm:mongoose@7.6.3";
import { Cliente } from "../type.ts";
import { HipotecaModel } from "./hipoteca.ts";
import{GestorModel} from"./gestor.ts";
const Schema = mongoose.Schema;

const ClienteSchema = new Schema(
  {
    name:{type:String, required:true},
    dni:{type:String, required:true},
    gestor:{type:mongoose.Schema.Types.ObjectId,ref:"Gestor", required:false},
    dinero:{type:Number,required:true, default:0},
    hipoteca:{type:[mongoose.Schema.Types.ObjectId], ref:"Hipoteca", required: false}
},
  { timestamps: false }
);
ClienteSchema.path("hipoteca").validate(async function(hipoteca:Array<mongoose.Schema.Types.ObjectId>){
  try{
    let num=0;
    for(let i=0; i<hipoteca.length;i++){
      const h= await HipotecaModel.findById(hipoteca[i]);
      if(h){
        num+= h.dtotal;
      }
    }
    return num <=1000000;
  }catch(e){
    return false;
  }
})

export type ClienteModelType = mongoose.Document & Omit<Cliente, "id" | "gestor" | "hipoteca"> & {
  gestor : mongoose.Schema.Types.ObjectId | null;
  hipotecas : Array<mongoose.Schema.Types.ObjectId>;
};

export const ClienteModel = mongoose.model<ClienteModelType>("Cliente", ClienteSchema)