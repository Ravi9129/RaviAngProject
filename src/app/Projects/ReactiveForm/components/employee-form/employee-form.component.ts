import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule,ReactiveFormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  @Input() employee: Employee | null = null;
  @Input() isEditMode = false;
  @Output() formSubmitted = new EventEmitter<Employee>();

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      joinDate: ['', Validators.required],
      skills: this.fb.array([]),
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
      })
    });
  }

  ngOnInit(): void {
    if (this.employee && this.isEditMode) {
      this.patchFormWithEmployeeData();
    }
    this.addSkill(); // Add one skill field by default
  }

  get skills(): FormArray {
    return this.employeeForm.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  patchFormWithEmployeeData(): void {
    this.employeeForm.patchValue({
      name: this.employee?.name,
      email: this.employee?.email,
      phone: this.employee?.phone,
      department: this.employee?.department,
      position: this.employee?.position,
      salary: this.employee?.salary,
      joinDate: this.employee?.joinDate,
      address: {
        street: this.employee?.address.street,
        city: this.employee?.address.city,
        state: this.employee?.address.state,
        zip: this.employee?.address.zip
      }
    });

    // Clear existing skills
    while (this.skills.length !== 0) {
      this.skills.removeAt(0);
    }

    // Add skills from employee data
    if (this.employee?.skills) {
      this.employee.skills.forEach(skill => {
        this.skills.push(this.fb.control(skill, Validators.required));
      });
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      const employeeData: Employee = {
        ...formValue,
        id: this.employee?.id || 0, // For new employee, ID will be assigned by server
        skills: formValue.skills.filter((skill: string) => skill.trim() !== '')
      };
      this.formSubmitted.emit(employeeData);
    } else {
      this.markAllAsTouched();
    }
  }

  markAllAsTouched(): void {
    Object.values(this.employeeForm.controls).forEach(control => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(subControl => {
          subControl.markAsTouched();
        });
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          arrayControl.markAsTouched();
        });
      } else {
        control.markAsTouched();
      }
    });
  }
}