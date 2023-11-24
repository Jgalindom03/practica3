//@ts-ignore //Para evitar que salga rojo lo del express
import {Request, Response} from "npm:express@4.18.2";
import {ClienteModel} from "../db/cliente.ts";

const enviarDinero = async(req:Request<{clienteenviaID:string, clienterecibeID:string, dineroenviado:number}>, res:Response<string | {error:unknown}>) => {
    try{
        const {clienteenviaID, clienterecibeID, dineroenviado} = req.body;
        const clienteOrigen = await ClienteModel.findById(clienteenviaID).exec();
        const clienteDestino = await ClienteModel.findById(clienterecibeID).exec();
        if(!clienteOrigen){
            res.status(404).send("no hay cliente origen");
            return;
        }
        if(!clienteDestino){
            res.status(404).send("no hay cliente destino");
            return;
        }
        if(clienteOrigen.dinero < dineroenviado){
            res.status(400).send("falta monety");
            return;
        }
        clienteOrigen.dinero -= dineroenviado;
        clienteDestino.dinero += dineroenviado;
        await clienteOrigen.save();
        await clienteDestino.save();
        res.status(200).send("Dinero enviado ");
    }catch(error){
        res.status(500).send(error.message); 
        return;
    }
}
export default enviarDinero;