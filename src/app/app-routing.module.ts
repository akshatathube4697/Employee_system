import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashComponent } from './admindash/admindash.component';
import { EmpdashComponent } from './empdash/empdash.component';
import { EmploginComponent } from './emplogin/emplogin.component';
import { EmployeeDashComponent } from './employee-dash/employee-dash.component';
import { EmpregisterComponent } from './empregister/empregister.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'employee-dash', pathMatch: 'full'
  },
  {
    path: 'emplogin', component: EmploginComponent
  },
  {
    path: 'empregister', component: EmpregisterComponent
  },
  {
    path: 'employee-dash', component: EmployeeDashComponent
  },
  {
    path: 'empdash', component: EmpdashComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'admindash', component: AdmindashComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
