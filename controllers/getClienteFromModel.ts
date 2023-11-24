import {Cliente} from "../type.ts"
import { ClienteModelType } from "../db/cliente.ts"
import { GestorModel } from "../db/gestor.ts"
import { HipotecaModel } from "../db/hipoteca.ts"

export const getClienteFromModel = async(
    cliente: ClienteModelType
):Promise<Cliente>=>{
const{_id,name,dni,gestor,hipoteca,dinero}=cliente;

const gestorm= await GestorModel.findById(gestor); 
if(!gestorm)throw new Error("Gestor not found");

const hipotecam= await HipotecaModel.findById({_id:{$in:hipoteca}});
if(!hipotecam) throw new Error("Hipoteca not found");

return{
    _id: _id.toString(),
    name,
    dni,
    gestor:{
        id:gestorm._id.toString(),
        name:gestorm.name
    },
    hipoteca:hipotecam.map((hipotecas)=>({
        id:hipotecas._id.toString(),
        coutas:hipotecas.coutas,
        dtotal:hipotecas.dtotal,
        dcompletado:hipotecas.dcompletado
    })),
    dinero,
}
}