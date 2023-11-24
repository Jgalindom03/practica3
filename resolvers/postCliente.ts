import {Request, Response} from "npm:express@4.18.2";
import {ClienteModel} from "../db/cliente.ts";
import { Cliente } from "../type.ts";
import { getClienteFromModel } from "../controllers/getClienteFromModel.ts";

const postCliente = async (req:Request, res: Response)  => {
    try{
        const {name, dni} = req.body;
        if(!name || !dni){
                res.status(500).send("Name or dni are required");
                return;
        }
        const alreadyExists = await ClienteModel.findOne({dni: dni});
        if(alreadyExists){
            res.status(400).send("The client already exists");
            return;
        }
        const newCliente = new ClienteModel({name, dni});
        await newCliente.save();
        const clienteResponse: Cliente = await getClienteFromModel(newCliente)
        res.status(200).send(clienteResponse)
    }catch(error){
        res.status(500).send(error.message);
        return
    }
}

export default postCliente;