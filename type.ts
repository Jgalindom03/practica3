export type Cliente ={
id:string,
name:string,
dni: string,
gestor:Omit<Gestor,"clientes">,
dinero:number,
hipoteca:Array<Omit<Hipoteca,"clientes"|"gestores">>,
};
export type Hipoteca={
id:string,
coutas: number,
dtotal:number,
dcompletado:number,
clientes: Omit<Cliente,"hipoteca"| "gestor">,
gestores:Omit<Gestor,"clientes">,
};
export type Gestor={
id:string,
name:string,
clientes:Array<Omit<Cliente,"gestor"| "hipoteca">>,
};