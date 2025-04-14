import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeFormComponent } from "../employee-form/employee-form.component";

@Component({
  selector: 'app-employee-edit',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, EmployeeFormComponent],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee | null = null;
  isLoading = true;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(+id).subscribe({
        next: (employee) => {
          this.employee = employee;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.router.navigate(['/employees']);
        }
      });
    } else {
      this.router.navigate(['/employees']);
    }
  }

  onFormSubmit(updatedEmployee: Employee): void {
    if (this.employee?.id) {
      this.employeeService.updateEmployee(this.employee.id, updatedEmployee).subscribe({
        next: () => {
          this.router.navigate(['/employees/details', this.employee?.id]);
        },
        error: (err) => {
          console.error('Error updating employee:', err);
        }
      });
    }
  }
}