import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { RegisterAndLoginComponent } from './register-and-login/register-and-login.component';
const routes: Routes = [
  { path: 'emp-list', component: EmployeeListComponent },
  { path: 'signup-login', component: RegisterAndLoginComponent },
  { path: 'create-employee', component: AddEmployeeComponent },
  { path: '', redirectTo: '/signup-login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
