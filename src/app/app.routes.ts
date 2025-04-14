import { Routes } from '@angular/router';
import { EmployeeListComponent } from './Projects/ReactiveForm/components/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './Projects/ReactiveForm/components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './Projects/ReactiveForm/components/employee-edit/employee-edit.component';
import { EmployeeDetailsComponent } from './Projects/ReactiveForm/components/employee-details/employee-details.component';
import { CustomerListComponent } from './Projects/tempForm/components/customer-list/customer-list.component';
import { CustomerCreateComponent } from './Projects/tempForm/components/customer-create/customer-create.component';
import { DashboardComponent } from './Projects/tempForm/components/dashboard/dashboard.component';
import { CustomerEditComponent } from './Projects/tempForm/components/customer-edit/customer-edit.component';
import { CustomerDetailsComponent } from './Projects/tempForm/components/customer-details/customer-details.component';
import { CustomerDeleteComponent } from './Projects/tempForm/components/customer-delete/customer-delete.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/create', component: EmployeeCreateComponent },
  { path: 'employees/edit/:id', component: EmployeeEditComponent },
  { path: 'employees/details/:id', component: EmployeeDetailsComponent },
 
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/create', component: CustomerCreateComponent },
  { path: 'customers/edit/:id', component: CustomerEditComponent },
  { path: 'customers/details/:id', component: CustomerDetailsComponent },
  { path: 'customers/delete/:id', component: CustomerDeleteComponent },
  { path: '**', redirectTo: '/dashboard' }
];
