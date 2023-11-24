import {Request, Response} from "npm:express@4.18.2";
import { Gestor } from "../type.ts";
import { Cliente } from "../type.ts";
import { Hipoteca } from "../type.ts";
import { HipotecaModel } from "../db/hipoteca.ts";
import { getHipotecaFromModel } from "../controllers/getHipotecaFromModel.ts";

const postHipoteca = async (req:Request<{ dtotal:number, clientes:Cliente, gestores:Gestor}>, res:Response<Hipoteca | {error:unknown}>) => {
    try{
        const {dtotal, clientes, gestores} = req.body;
        const hipoteca = new HipotecaModel({dtotal,clientes,gestores });
        await hipoteca.save();
        const hipotecaResponse = await getHipotecaFromModel(hipoteca);
        res.status(201).send(hipotecaResponse); 
    }catch(error){
        res.status(500).send(error.message);
        return;
    }
}
export default postHipoteca;