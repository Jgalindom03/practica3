import {Request, Response} from "npm:express@4.18.2";
import {ClienteModel} from "../db/cliente.ts";

const ingresarDinero = async(req:Request<{id:string, dinero:number}>, res:Response<string | {error:unknown}>) => {
    try{
        const {id, dinero} = req.body;
        const cliente = await ClienteModel.findById(id).exec();
        if(!cliente){
            res.status(404).send("No se pudo encontrar el cliente");
            return;
        }
        cliente.dinero += Number(dinero);
        await cliente.save();
        res.status(200).send("dinero ingresado correctamente");
    }catch(error){
        res.status(500).send(error.message); 
        return;
    }
}
export default ingresarDinero;