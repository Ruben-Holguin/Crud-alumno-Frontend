export class Alumno {
    id: number;
    nombres: string;
    apellidos:string;

    constructor(id: number, nombres: string, apellidos: string){
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
    }
}
