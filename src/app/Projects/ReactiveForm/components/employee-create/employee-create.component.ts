import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { EmployeeFormComponent } from "../employee-form/employee-form.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  imports: [EmployeeFormComponent,FormsModule,ReactiveFormsModule, CommonModule],

  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.css'
})
export class EmployeeCreateComponent {

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  
  onFormSubmit(employeeData: Employee): void {
    this.employeeService.createEmployee(employeeData).subscribe({
      next: (createdEmployee) => {
        this.router.navigate(['/employees/details', createdEmployee.id]);
      },
      error: (err) => {
        console.error('Error creating employee:', err);
      }
    });
  }
}

