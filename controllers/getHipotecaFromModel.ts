import { Hipoteca } from "../type.ts";
import { HipotecaModelType } from "../db/hipoteca.ts";
import { ClienteModel } from "../db/cliente.ts";
import { GestorModel } from "../db/gestor.ts";

export const getHipotecaFromModel= async( 
    hipoteca:HipotecaModelType
):Promise<Hipoteca> =>{
    const{_id,coutas,dtotal,dcompletado,clientes,gestores}=hipoteca;

    const clientem= await ClienteModel.findById(clientes);
    if(!clientem) throw new Error("Cliente not found");

    const gestorm= await GestorModel.findById(gestores);
    if(!gestorm) throw new Error("Gestor not found");

    if(clientem.gestores && clientem.gestores.toString()!=gestorm._id.toString()){
        throw new Error("Gestor cliente y gestor hipoteca deberían de ser el mismo");
    
    }
    return{
        id:_id.toString(),
        coutas,
        dtotal,
        dcompletado,
        clientes:{
            id:clientem._id.toString(),
            name:clientem.name,
            dni:clientem.dni,
            dinero:clientem.dinero
        },
        gestores:{
            id:gestorm._id.toString(),
            name:gestorm.name,
        }
    }
}