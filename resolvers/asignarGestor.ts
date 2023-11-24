import {Request, Response} from "npm:express@4.18.2";
import {GestorModel} from "../db/gestor.ts";
import {ClienteModel} from "../db/cliente.ts";

const asignarGestor = async(req:Request<{clienteID:string, gestorID:string}>, res:Response<string | {error:unknown}>) => {
    try{
        const {clienteID, gestorID} = req.body;
        const cliente = await ClienteModel.findById(clienteID.trim()).exec();
        if(!cliente){
            res.status(404).send("No se encuentra el cliente");
            return;
        }
        const gestor = await GestorModel.findById(gestorID).exec();
        if(!gestor){
            res.status(404).send("No se encuentra gestor");
            return;
        }
        if(cliente.gestor){
            res.status(400).send("El cliente ya tiene un gestor");
            return;
        }
        await ClienteModel.findByIdAndUpdate(clienteID, {gestor: gestorID}, {new: true, runValidators:true}).exec(); 
        res.status(200).send("Gestor asignado ");
    }catch(error){
        res.status(500).send(error.message);
        return;
    }
}
export default asignarGestor;