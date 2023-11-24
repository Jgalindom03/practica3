import {Request, Response} from "npm:express@4.18.2";
import { ClienteModel } from "../db/cliente.ts";
import { GestorModel } from "../db/gestor.ts";
import { Gestor } from "../type.ts";
import { Cliente } from "../type.ts";
import { getGestorFromModel } from "../controllers/getGestorFromModel.ts";

const postGestor = async(req:Request<{nombre:string, clientes:Cliente[] | null}>, res:Response<Gestor | {error:unknown}>) => {
    try{
        const {name, clientes} = req.body;
        const gestor = new GestorModel({name,clientes});
        await gestor.save();
        if (clientes) {
            await Promise.all(clientes.map(async (clienteId: string) => { 
                const cliente = await ClienteModel.findById(clienteId).exec();
                if (cliente) {
                    if (cliente.gestor) {
                        res.status(400).send("El cliente ya tiene un gestor");
                        throw new Error("El cliente ya tiene un gestor"); 
                    }
                    cliente.gestor = gestor._id;
                    await cliente.save();
                }
            }));
        }
        const gestorResponse = await getGestorFromModel(gestor);
        res.status(201).send(gestorResponse); 
    }catch(error){
        res.status(500).send(error.message); 
        return;
    }
}

export default postGestor;