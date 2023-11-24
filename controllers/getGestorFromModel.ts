import { Gestor } from "../type.ts"
import { ClienteModel } from "../db/cliente.ts"
import { GestorModelType } from "../db/gestor.ts"

export const getGestorFromModel = async( 
    gestor:GestorModelType
): Promise<Subject> =>{
    const{_id, name, clientes}=gestor;

    const clientesm= await ClienteModel.find({_id:{$in:clientes}});

    return{
        id:_id.toString(),
        name,
        clientes: clientesm.map((cliente)=>({
            id:cliente._id.toString(),
            name:cliente.name,
            dni:cliente.dni,
            dinero:cliente.dinero,
        }))
    }
}