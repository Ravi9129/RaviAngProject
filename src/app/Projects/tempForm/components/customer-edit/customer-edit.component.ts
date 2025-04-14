import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-edit',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent implements OnInit {
  customerId!: number;
  customer: Customer = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    category: 'Regular',
    status: 'Active',
    contactPerson: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zip: ''
    },
    notes: ''
  };
  
  isLoading = true;
  isUpdating = false;
  errorMessage = '';
  
  categories = ['Regular', 'Premium', 'VIP'];
  statuses = ['Active', 'Inactive', 'Suspended'];

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCustomer();
  }

  loadCustomer(): void {
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (customer) => {
        this.customer = customer;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load customer details';
        this.isLoading = false;
        console.error('Error loading customer:', err);
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.markFormAsTouched(form);
      return;
    }

    this.isUpdating = true;
    this.customerService.updateCustomer(this.customerId, this.customer).subscribe({
      next: () => {
        this.router.navigate(['/customers/details', this.customerId]);
      },
      error: (err) => {
        this.errorMessage = 'Failed to update customer';
        this.isUpdating = false;
        console.error('Error updating customer:', err);
      }
    });
  }

  private markFormAsTouched(form: NgForm): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      control.markAsTouched();
    });
  }
}