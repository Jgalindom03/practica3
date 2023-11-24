import { Request, Response } from "npm:express@4.18.2";
import { HipotecaModel } from "../db/hipoteca.ts";
import { ClienteModel } from "../db/cliente.ts";
import { getHipotecaFromModel } from "../controllers/getHipotecaFromModel.ts";
import { getClienteFromModel } from "../controllers/getClienteFromModel.ts";

const amortizarHipoteca = async(req:Request<{id:string, cantidad:number}>, res:Response<string | {error:unknown}>) => {
    try{
        const{id, cantidad} = req.body;

        if(!id || !cantidad){
            res.status(400).send("Faltan datos");
            return;
        }

        const hipoteca = await HipotecaModel.findById(id).exec();

        if(!hipoteca){
            res.status(404).send("No existe una hipoteca con ese id");
            return;
        }

        const {cuotas, dcompletado} = hipoteca;

        const hipotecaResponse = await getHipotecaFromModel(hipoteca);

        const cliente = hipotecaResponse.clientes;

        const clienteModel = await ClienteModel.findById(cliente._id).exec();

        if(!clienteModel){
            res.status(404).send("Error al buscar el cliente de la hipoteca");
            return;
        }

        const clienteResponse = await getClienteFromModel(clienteModel);

        const dineroCliente = clienteResponse.dinero;

        if(dineroCliente < cantidad){
            res.status(400).send("El cliente no tiene suficiente dinero para amortizar la hipoteca");
            return;
        }

        const dineroClienteActualizado = dineroCliente - cantidad;

        const amortizadoActualizado:number = Number(dcompletado) + Number(cantidad);

        const cuotaActualizada:number = cuotas - 1;

        if(cuotaActualizada <= 0){
            await ClienteModel.findByIdAndUpdate(cliente.id, {dinero: dineroClienteActualizado}, {new: true, runVolidators:true}).exec();
            await HipotecaModel.findByIdAndDelete(id).exec();
            res.status(200).send("Hipoteca completamente amortizada, dcompletado actualizado: " + amortizadoActualizado + ", dinero cliente actualizada: " + carteraClienteActualdinero + "");
          return;
        }

        await ClienteModel.findByIdAndUpdate(cliente.id, {dinero: dineroClienteActualizado}, {new: true, runValidators:true}).exec();
        await HipotecaModel.findByIdAndUpdate(id, {dcompletado: amortizadoActualizado, cuotas: cuotaActualizada}, {new: true, runValidators:true}).exec();

        console.log("he completado esta cantidad y esta es mi dinero ahora mismo", dineroClienteActualizado)

        res.status(200).send("Hipoteca amortizada correctamente, dcompletado actualizado: " + amortizadoActualizado + ", cuotas actualizada: " + cuotaActualizada + "");
    }catch(error){
        res.status(500).send(error.message);
        return;
    }
}

export default amortizarHipoteca;