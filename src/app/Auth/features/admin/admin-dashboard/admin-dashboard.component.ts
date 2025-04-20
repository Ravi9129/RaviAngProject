import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { ChartConfiguration, ChartType } from 'chart.js';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { CustomerService } from '../../../../Projects/tempForm/services/customer.service';
import { EmployeeService } from '../../../../Projects/ReactiveForm/services/employee.service';


@Component({
  selector: 'app-admin-dashboard',
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  
})
export class AdminDashboardComponent implements OnInit {
  userCount = 0;
  employeeCount = 0;
  customerCount = 0;

  constructor(
    private userService: UserService,
    private employeeService: EmployeeService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.userCount = users.length;
    });

    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employeeCount = employees.length;
    });

    this.customerService.getAllCustomers().subscribe(customers => {
      this.customerCount = customers.length;
    });
  }
}