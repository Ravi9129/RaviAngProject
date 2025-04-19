import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../shared/validators/custom.validators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true })
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: CustomValidators.passwordMatchValidator('password', 'confirmPassword')
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
  
    this.isLoading = true;
    const { confirmPassword, ...userData } = this.registerForm.value;
  
    this.authService.register({
      ...userData,
      roles: ['user'], // Add default role
      refreshToken: `refresh-token-${Date.now()}` // Simple token
    }).subscribe({
      next: () => {
        this.router.navigate(['/auth/login'], { 
          queryParams: { registered: true } 
        });
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.isLoading = false;
        // Show error to user
      }
    });
  }
}