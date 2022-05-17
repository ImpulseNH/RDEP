export interface Cliente {
    //rut: string;
    nombrecompleto: string;
    //alias:string;
    telefono: number;
    correo: string;
    contrasena: string;

}

export const ListaClientes:Array<Cliente> = [];