import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private apiUrl="http://localhost:8080/api/alumnos"
  constructor(private http: HttpClient) { }

  getAlumno():Observable<Alumno[]>{
    return this.http.get<Alumno[]>(this.apiUrl);
  }
  getAlumnoById(id:number):Observable<Alumno>{
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`);
  }
  crearAlumno(Alumno: Alumno):Observable<Alumno>{
    return this.http.post<Alumno>(this.apiUrl,Alumno);
  }
  editarAlumno(Alumno: Alumno):Observable<Alumno>{
    return this.http.post<Alumno>(this.apiUrl,Alumno);
  }
  deleteAlumno(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
