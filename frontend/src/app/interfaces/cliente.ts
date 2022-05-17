export interface Cliente {
    rut: number;
    nombrecompleto: string;
    alias: string;
    telefono: number;
    correo: string;
    contrasena: string;

}

export const ListaClientes:Array<Cliente> = [];