import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';

export const routes: Routes = [

    {
        path: '',
        component: StudentComponent,
        pathMatch: 'full'
    },

    {
        path: 'student',
        component: StudentComponent
    }
];
