import {Request, Response} from "npm:express@4.18.2";
import {ClienteModel} from "../db/cliente.ts";

const deleteCliente = async(req:Request<{id:string}>, res:Response<string | {error:unknown}>) => {
    try{
        const id = req.params.id;
        const clienteDelete = await ClienteModel.findByIdAndDelete(id).exec();
        if(!clienteDelete){
            res.status(404).send("No existe  cliente ");
            return;
        }
        res.status(200).send("Cliente borrado ");
    }catch(error){
        res.status(500).send(error.message); 
        return;
    }
}
export default deleteCliente;