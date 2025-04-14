import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Customer } from '../../models/customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-create',
  imports: [CommonModule,FormsModule],
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.css'
})
export class CustomerCreateComponent {
  customer: Omit<Customer, 'id'> = {
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

  categories = ['Regular', 'Premium', 'VIP'];
  statuses = ['Active', 'Inactive', 'Suspended'];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.customerService.createCustomer(this.customer).subscribe({
        next: (createdCustomer) => {
          this.router.navigate(['/customers/details', createdCustomer.id]);
        },
        error: (err) => {
          console.error('Error creating customer:', err);
        }
      });
    }
  }
}