import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-delete',
  imports: [FormsModule, CommonModule],
  templateUrl: './customer-delete.component.html',
  styleUrl: './customer-delete.component.css'
})
export class CustomerDeleteComponent implements OnInit {
  customerId!: number;
  customer!: Customer;
  isLoading = true;
  isDeleting = false;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (customer) => {
        this.customer = customer;
        this.isLoading = false;
      },
      error: () => {
        this.router.navigate(['/customers']);
      }
    });
  }

  confirmDelete(): void {
    this.isDeleting = true;
    this.customerService.deleteCustomer(this.customerId).subscribe({
      next: () => {
        this.router.navigate(['/customers']);
      },
      error: (err) => {
        console.error('Error deleting customer:', err);
        this.isDeleting = false;
      }
    });
  }
}
