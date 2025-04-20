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
import { ProfileComponent } from './Auth/features/user/profile/profile.component';
import { AuthGuard } from './Auth/core/guards/auth.guard';
import { UserListComponent } from './Auth/features/user/user-list/user-list.component';
import { LoginComponent } from './Auth/features/auth/login/login.component';
import { RegisterComponent } from './Auth/features/auth/register/register.component';
import { roleGuard } from './Auth/core/guards/role.guard';
import { AdminDashboardComponent } from './Auth/features/admin/admin-dashboard/admin-dashboard.component';


export const routes: Routes = [
  // Public routes
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  
  // Protected routes
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  
  // Employee routes
  { 
    path: 'employees', 
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'manager', 'user'] } 
  },

  { 
    path: 'admin', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  { 
    path: 'employees/create', 
    component: EmployeeCreateComponent,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['admin'] }
   // data: { roles: ['admin', 'manager', 'user'] } 
  },
  { 
    path: 'employees/edit/:id', 
    component: EmployeeEditComponent,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  { 
    path: 'employees/details/:id', 
    component: EmployeeDetailsComponent,
    canActivate: [AuthGuard] 
  },
  
  // Customer routes
  { 
    path: 'customers', 
    component: CustomerListComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'customers/create', 
    component: CustomerCreateComponent,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  { 
    path: 'customers/edit/:id', 
    component: CustomerEditComponent,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  { 
    path: 'customers/details/:id', 
    component: CustomerDetailsComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'customers/delete/:id', 
    component: CustomerDeleteComponent,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  
  // User management routes
  { 
    path: 'user/profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'user/list', 
    component: UserListComponent,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  { 
    path: 'admin', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  
  // Wildcard route
  { path: '**', redirectTo: '/dashboard' }
];