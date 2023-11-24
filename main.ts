import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import { ClienteModel } from "./db/cliente.ts";
import { HipotecaModel } from "./db/hipoteca.ts";

import postCliente from "./resolvers/postCliente.ts";
import deleteCliente from "./resolvers/deleteCliente.ts";
import enviarDinero from "./resolvers/enviarDinero.ts";
import ingresarDinero from "./resolvers/ingresarDinero.ts";
import postGestor from "./resolvers/postGestor.ts";
import asignarGestor from "./resolvers/asignarGestor.ts";
import postHipoteca from "./resolvers/postHipoteca.ts";
import amortizarHipoteca from "./resolvers/amortizarHipoteca.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if(!MONGO_URL){
  console.log("No se ha encontrado la variable de entorno MONGO_URL");
Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json());

app.post("/api/cliente", postCliente); 
app.delete("/api/delete/:id",deleteCliente);
app.put("/api/enviarDinero", enviarDinero); 
app.put("/api/ingresarDinero", ingresarDinero); 
app.post("/api/gestor", postGestor); 
app.put("/api/asignarGestor", asignarGestor); 
app.post("/api/hipoteca", postHipoteca); 
app.put("/api/amortizarHipoteca", amortizarHipoteca); 

app.listen(3000, () => {
  console.log(`Servidor escuchando en el puerto 3000`);
});