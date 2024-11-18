import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../service/alumno.service';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [SidebarComponent,TableModule, CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule, ConfirmDialogModule, ToastModule, DropdownModule],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent {
  alumnos: Alumno[]=[];
  alumno: Alumno= new Alumno(0, '', '');
  titulo: string= '';
  opc: string= '';
  op= 0;
  visible: boolean= false;
  isDeleteInProgress: boolean= false;
  
  constructor(private alumnoService: AlumnoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService){}

  ngOnInit():void {
    this.listarAlumnos();
  }

  showDialogCreate(){
    this.titulo= "Añadir nueva alumno"
    this.opc= "Guardar";
    this.op= 0;
    this.visible= true;
  }

  limpiar(){
    this.titulo= '';
    this.opc= '';
    this.op= 0;
    this.alumno.id= 0;
    this.alumno.nombres= '';
    this.alumno.apellidos= '';
  }

  opcion(): void{
    if (this.op==0) {
      this.addAlumno();
      this.limpiar();
    } else if (this.op==1) {
      console.log("Editar");
      this.editAlumnos();
      this.limpiar();
    } else {
      console.log("Vacio");
      this.limpiar();
    }
  }    

  listarAlumnos(){
    this.alumnoService.getAlumno().subscribe(
      (data: Alumno[]) => {
        this.alumnos = data;
      });
  }

  addAlumno():void{
    this.alumnoService.crearAlumno(this.alumno).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Alumno registrado con exito',
        });
        this.listarAlumnos();
        this.op= 0;
      },
      error: () => {
        this.isDeleteInProgress= false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "No se puedo registrar el alumno",
        });
      },
    });
    this.visible= false;
  }

  editAlumnos() {
    this.alumno.id = Number(this.alumnos.find(f => f.id === this.alumno.id)?.id || 0);
    this.alumnoService.editarAlumno(this.alumno).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Alumno editado con exito',
        });
        this.visible = false;
        this.listarAlumnos();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar al alumno',
        });
      },
    });
  }


  deleteAlumno(id: number){
    this.isDeleteInProgress= true;
    this.alumnoService.deleteAlumno(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Alumno eliminado con exito',
        });
        this.isDeleteInProgress= false;
        this.listarAlumnos();
      },
      error: () => {
        this.isDeleteInProgress= false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar al alumno',
        });
      },
    });  
  }


  showDialogEdit(id: number){
    this.titulo= "Editar Alumno"
    this.opc= "Actualizar";
    this.alumnoService.getAlumnoById(id).subscribe((data)=>{
      this.alumno= data;
      this.op= 1;
    });
    this.visible= true;
  }

  
}
