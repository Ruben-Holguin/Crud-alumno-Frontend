import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { AlumnoComponent } from './componentes/alumno/alumno.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'home'
    },
    {
        path: 'alumno',
        component: AlumnoComponent,
        title: 'Alumno'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
